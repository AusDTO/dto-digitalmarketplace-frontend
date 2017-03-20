import React from 'react';
import {connect} from 'react-redux';
import BaseForm      from '../../../shared/form/BaseForm';
import SubmitForm    from '../../../shared/form/SubmitForm';
import ErrorBox      from '../../../shared/form/ErrorBox';
import StatefulError from '../../../shared/form/StatefulError';
import {Form, Control} from 'react-redux-form';

import {required} from '../../../validators';
import formProps     from '../../../shared/reduxModules/formPropsSelector';

const agreementStyle = {
    width: '100%',
    outlineOffset: 0,
    border: '2px solid #bebebe',
    borderRadius: 0,
    backgroundColor: '#fff',
    padding: '.4rem',
    height: '24rem',
    overflowY: 'scroll'
}

class SubmitStepForm extends BaseForm {
    static defaultProps = {
        onClick: () => {
        },
        submitUrl: '#',
        authoriseUrl: '#',
    }

    static propTypes = {
        model: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.func
        ]).isRequired,
        form: React.PropTypes.object.isRequired,
        submitUrl: React.PropTypes.string,
        authoriseUrl: React.PropTypes.string,
        onClick: React.PropTypes.func,
        applicationValid: React.PropTypes.bool,
        stepsRemaining: React.PropTypes.string,
        name: React.PropTypes.string,
        abn: React.PropTypes.string,
        email: React.PropTypes.string,
        representative: React.PropTypes.string,
        userEmail: React.PropTypes.string,
        csrfToken: React.PropTypes.string
    };

    handleSubmit(val) {
        // Do anything you want with the form value
        console.log(val);
    }

    render() {
        let {model, submitUrl, applicationValid, name, abn, representative, userEmail, authoriseUrl, email, csrfToken, form, onSubmit, stepsRemaining} = this.props;
        let message;
        const userIsAuthorised = userEmail && email && userEmail.toLowerCase() === email.toLowerCase();
        const title = userIsAuthorised ? 'Your declaration': 'Share with authorised representative';
        const buttonText = userIsAuthorised ? 'Submit application' : 'Send email to representative';
        const action = userIsAuthorised ? submitUrl : authoriseUrl;

        if (userIsAuthorised) {
            message = (
                <div>
                    <p>All you need to do now is:</p>
                    <ol><li>Review your application and the Master Agreement</li>
                        <li>Complete the declaration below</li>
                    </ol>
                    <a href="/static/media/documents/digital-marketplace-master-agreement.pdf" rel="external" target="_blank">Download Master Agreement PDF</a><br/>
                    <a href="/static/media/documents/digital-marketplace-master-agreement.html" target="_blank" rel="external">View Master Agreement in HTML</a><br/><br/>


                    <div style={agreementStyle}>
                        <h1>Master Agreement</h1>
                        <h2>Introduction and scope</h2>
                        <p>This <strong>agreement</strong> covers all <strong>your</strong> interactions in the <strong>Digital Marketplace,</strong> including selling to <strong>buyers</strong>. This <strong>agreement</strong> also forms part of the terms incorporated into every <strong>work order</strong> contract agreed to by <strong>you</strong> and a <strong>buyer</strong>. </p>
                        <p>Before <strong>you</strong> can join the <strong>Digital Marketplace</strong> as a <strong>registered seller </strong>and join the Digital Marketplace Panel as an <strong>active seller</strong>, a person authorised to enter arrangements on behalf of <strong>your</strong> organisation must accept this <strong>agreement</strong>. </p>
                        <p>This <strong>agreement</strong> will be updated from time to time to reflect the evolution of the <strong>Digital Marketplace</strong>. If <strong>you</strong> choose not to accept an update <strong>you</strong> will lose <strong>seller</strong> status. Existing <strong>work orders</strong> awarded to <strong>you</strong> will remain in force until completed or terminated according to the terms of the <strong>work order</strong>.</p>
                        <p>The drafting principles <strong>we</strong> have used are:</p>
                        <ul>
                        <li>This <strong>agreement</strong> contains foundational terms which provide contractual protection for all purchases in the <strong>Digital Marketplace </strong>under <strong>work orders</strong>. It is designed to work with <strong>work</strong> <strong>orders</strong> to enable customisation of contracts between <strong>buyers</strong> and <strong>sellers </strong>for a particular <strong>opportunity</strong>.</li>
                        <li><strong>We</strong> do not restate any common law principles or existing legal requirements that apply to <strong>you</strong> (for example, privacy and workplace health and safety (WHS) obligations).</li>
                        <li>Words in <strong>bold</strong> have a special legal meaning outlined in the <a href="#definitions">definitions section</a>.</li>
                        <li>Where possible, <strong>we</strong> explain terms as <strong>we</strong> go rather than relying on definitions.</li>
                        </ul>
                        <h2>Terms</h2>
                        <h3>1. General</h3>
                        <p>This <strong>agreement </strong>is between<strong> you</strong> and the <strong>DTA</strong>.</p>
                        <p>This <strong>agreement</strong> begins on the <strong>commencement date</strong> and continues until terminated by either party.</p>
                        <p><strong>We</strong> may invite other <strong>sellers</strong> to join and do business on the <strong>Digital Marketplace</strong> at any time.</p>
                        <p><strong>We</strong> may add, remove or update <strong>areas of expertise </strong>at any time. </p>
                        <p><strong>We</strong> may publish information relating to this <strong>agreement</strong> and <strong>work orders</strong> in line with the <a href="http://standard.open-contracting.org/latest/en/">Open Contracting Data Standard</a>. </p>
                        <p><strong>You</strong> agree that the inclusion of <strong>your</strong> details on the <strong>Digital Marketplace</strong> under this <strong>agreement</strong> is of value to <strong>you</strong> and sufficient consideration for this <strong>agreement</strong> to be binding. </p>
                        <p><strong>You</strong> must not represent that <strong>you</strong> are an employee, partner, officer or agent of the <strong>DTA</strong> or a <strong>buyer</strong>.</p>
                        <h3>2. Priority of documents</h3>
                        <p>There will be times when the nature of an <strong>opportunity</strong> means that <strong>you</strong> or the <strong>buyer</strong> need to add to this <strong>agreement</strong>. A <strong>buyer</strong> may highlight additional terms in their posted <strong>opportunity </strong>or subsequently. <strong>You</strong> and the <strong>buye</strong>r must agree on any additional terms and include them in the <strong>work order</strong>. <strong>You</strong> cannot amend any parts of this <strong>agreement</strong> that relate to <strong>your</strong> contractual relationship with <strong>us </strong>with additional terms.</p>
                        <p>If there is any inconsistency in the documents forming a <strong>work order</strong>, those documents will be interpreted in the following order of priority:</p>
                        <ol>
                        <li>Additional terms to this agreement included in the <strong>work order</strong>.</li>
                        <li>This <strong>agreement</strong>.</li>
                        <li>The details contained in the <strong>work order</strong>.</li>
                        <li>Any attachments to the <strong>work order</strong>.</li>
                        <li>Any other document referred to in the <strong>work order</strong>.</li>
                        </ol>
                        <h3>3. Work orders</h3>
                        <p>A <strong>work order</strong> is not effective until accepted by both the <strong>buyer </strong>and the <strong>seller. </strong></p>
                        <p>Once effective, <strong>work orders</strong> create a separate contract on the terms of this <strong>agreement</strong> and any terms specified in the <strong>work order</strong>.</p>
                        <h3>4. Adding services and products</h3>
                        <p><strong>You</strong> may offer additional <strong>services</strong> or <strong>products</strong> for possible inclusion in the <strong>Digital Marketplace</strong> at any time by following the process in the <strong>Digital Marketplace</strong>.</p>
                        <h3>5. Non-exclusive arrangement</h3>
                        <p>This <strong>agreement</strong> is not exclusive and does not guarantee that <strong>you</strong> will receive <strong>opportunities</strong> or <strong>work orders</strong> and does not prevent <strong>buyers</strong> from buying services or products elsewhere.</p>
                        <h3>6. Seller obligations</h3>
                        <p><strong>You</strong> must supply the <strong>services</strong> or <strong>products</strong> specified in a <strong>work order</strong>:</p>
                        <ul>
                        <li>To the reasonable satisfaction of the <strong>buyer </strong>and to the standard set out in the <strong>work order</strong>.</li>
                        <li>In a manner that equals or exceeds the standard expected of a <strong>seller</strong> experienced and qualified in the performance of similar <strong>services</strong> or provision of similar <strong>products</strong>.</li>
                        <li>In accordance with the <a href="https://www.dta.gov.au/standard/">Digital Service Standard</a> and any other relevant standards, industry better practice and guidelines, including any specified in the <strong>work order</strong>.</li>
                        <li>In accordance with the <strong>buyer</strong> policies, legal and specific terms or requirements, set out in a <strong>work order</strong> or notified to <strong>you</strong> in writing.</li>
                        <li><strong>You</strong> must advise <strong>us</strong> immediately if <strong>you</strong> become non-compliant with any of the above requirements.</li>
                        </ul>
                        <p><strong>You</strong> must ensure:</p>
                        <ul>
                        <li><strong>You</strong> have all rights, titles, licences, interests and property necessary to lawfully perform the <strong>services</strong> or provide the <strong>products</strong>.</li>
                        <li>The <strong>products </strong>or<strong> services</strong> will be fit for the purpose as set out in the applicable <strong>work order</strong>.</li>
                        <li><strong>You</strong> will continue to hold all insurance policies specified in the <strong>work order</strong> or as are appropriate for the <strong>services </strong>or provision of the <strong>products</strong>.</li>
                        <li><strong>You</strong> update <strong>your</strong> disclosures by editing <strong>your</strong> <strong>Digital Marketplace</strong> seller profile if any of the information relating to <strong>your</strong> disclosures changes.</li>
                        </ul>
                        <p>If you do not do these things <strong>DTA</strong> may terminate this <strong>agreement</strong> and a <strong>buyer</strong> may terminate any affected <strong>work order </strong>without liability to <strong>us</strong> or the <strong>buyer.</strong></p>
                        <h3>7. Licences, warranties and documentation</h3>
                        <p><strong>You</strong> must transfer to the <strong>buyer</strong> all licences and warranties for any <strong>services</strong> or <strong>products</strong> and any documentation needed by the <strong>buyer</strong> to fully use the <strong>services </strong>or <strong>products</strong>.</p>
                        <h3>8. Intellectual property rights</h3>
                        <p><strong>General</strong></p>
                        <p><strong>You</strong> must ensure that the<strong> buyer</strong>&rsquo;s use of the <strong>order material</strong> will not <strong>infringe</strong> the <strong>intellectual property rights</strong> of any person.</p>
                        <p><strong>You</strong> must obtain any <strong>moral rights consents </strong>in writing necessary for the <strong>buyer</strong> to use the <strong>order material</strong>. </p>
                        <p>If someone claims <strong>intellectual property rights</strong> over any <strong>material</strong>, <strong>you</strong> must, at <strong>your</strong> cost, either:</p>
                        <ul>
                        <li>Ensure that the <strong>buyer</strong> can continue to use the relevant <strong>material</strong> without liability or infringement; or </li>
                        <li>Replace or modify the <strong>material</strong> so that it does not <strong>infringe</strong> the <strong>intellectual property rights</strong> of any other party, without degrading the performance or quality of the <strong>material</strong>.</li>
                        </ul>
                        <p><strong>Software intellectual property and licensing</strong></p>
                        <p>Unless otherwise agreed in a <strong>work order, </strong>for <strong>order material</strong> that is <strong>software</strong> but not <strong>proprietary software</strong>:</p>
                        <ul>
                        <li>The <strong>software </strong>shall be open source, or capable of being open source and licenced, or capable of being licenced, under a Creative Commons Attribution Licence 4.0 International CC-NC.</li>
                        <li>To the extent that <strong>software</strong> is not open source, as specified in the <strong>work order</strong>, the <strong>intellectual property rights</strong> will vest in the <strong>seller</strong> and the <strong>seller </strong>will give the <strong>buyer </strong>a perpetual, irrevocable, fully paid up, royalty-free, worldwide, non-exclusive licence to reproduce, publish, use, modify, adapt, communicate and reproduce the <strong>software</strong>, including the right to engage third parties to modify or adapt the <strong>software</strong>, and the right to sublicense or transfer the licence to the government&rsquo;s central pool of licences for the relevant level of government, but not the right to commercially exploit the <strong>software</strong>.</li>
                        <li>No other <strong>software</strong> terms (including <strong>your</strong> standard software licensing terms) apply to the<strong> work order</strong>.</li>
                        </ul>
                        <p><strong>Order material other than software</strong></p>
                        <p><strong>Intellectual property rights</strong> in any <strong>order material</strong> other than <strong>software</strong> and standard form documentation relating to the <strong>software</strong> supplied to the <strong>seller&rsquo;s</strong> customers hereby vest in the <strong>buyer</strong> from the date they come into existence. In this context, &ldquo;hereby&rdquo; is a legal term meaning at this time, to the greatest extent possible, but without creating any additional documentation. </p>
                        <p><strong>You</strong> must ensure the <strong>buyer</strong> is provided with any <strong>intellectual property rights</strong> licence or usage rights it needs to use any <strong>material </strong>provided with (or needed for the use of) the <strong>order material</strong>.</p>
                        <h3>9. Delivery</h3>
                        <p>If <strong>you</strong> are unable to provide all or part of the <strong>services</strong> or <strong>products</strong> specified in a <strong>work order </strong>in a reasonable timeframe, <strong>you</strong> must notify the <strong>buyer</strong> immediately. </p>
                        <p>The <strong>buyer</strong> will accept <strong>deliverables</strong> according the requirements in a <strong>work order.</strong></p>
                        <p><strong>Deliverables</strong> and <strong>products</strong> become the property of the <strong>buyer</strong> on <strong>delivery</strong> subject only to them being paid for. Risk in <strong>deliverables</strong> and <strong>products </strong>transfers on acceptance of the <strong>order material</strong>.</p>
                        <h3>10. Specified personnel, security and safety</h3>
                        <p>Where a <strong>work order</strong> specifies named <strong>personnel</strong>, <strong>you</strong> must only use the named <strong>personnel</strong> and not replace, reduce or supplement them without prior written approval from the <strong>buyer</strong>. </p>
                        <p>If <strong>you</strong> are required to obtain security clearances, <strong>you</strong> are responsible for any costs associated with doing so and any failure to obtain clearances or obtain them within any timeframe does not provide an excuse to the <strong>seller</strong> for failing to perform any <strong>services</strong> or provide any <strong>products</strong> on time.</p>
                        <p><strong>You</strong> must comply with all security, health, workplace and safety and any other requirements set out in the <strong>work order</strong> or that are applicable to the work, premises or location at which the <strong>services</strong> or <strong>products</strong> are being delivered.</p>
                        <p><strong>You</strong> must not copy, transmit or remove any data without prior written approval from the <strong>buyer</strong>.</p>
                        <h3>11. Subcontracting</h3>
                        <p>Except as set out in the <strong>work order</strong>, <strong>you</strong> must not subcontract any aspect of the <strong>services</strong> without obtaining the <strong>buyer</strong>&rsquo;s prior written consent.</p>
                        <h3>12. Payment and expenses</h3>
                        <p>If the <strong>products </strong>or<strong> services</strong> meet the requirements of the <strong>work order</strong>, the <strong>buyer</strong> will pay <strong>you</strong>.</p>
                        <p><strong>You</strong> must provide a correctly rendered tax invoice to the <strong>buyer</strong> containing the information required by the <strong>buyer</strong> as specified in the <strong>work order</strong>.The <strong>buyer</strong> will pay <strong>you</strong> within 30 days of the <strong>buyer</strong> receiving a correct tax invoice.</p>
                        <p><strong>You</strong> must not charge the <strong>buyer</strong> for any supply or expense not specified in the <strong>work order</strong> (for example, travel).</p>
                        <h3>13. Interest for late payment</h3>
                        <p><strong>Buyers</strong> will pay interest for late payments in accordance with the relevant government policy. At the Commonwealth level, the Supplier Pay On-Time or Pay Interest Policy applies.</p>
                        <h3>14. Taxes</h3>
                        <p><strong>You</strong> must pay all taxes, duties and government charges that are due in Australia or overseas in connection with a <strong>work order</strong>.</p>
                        <p>Prices in a <strong>work order</strong> are exclusive of GST. On receipt of a correctly rendered tax invoice, the <strong>buyer</strong> will pay <strong>you</strong> the GST exclusive amount plus any GST that applies.</p>
                        <h3>15. Buyer material</h3>
                        <p>The <strong>buyer</strong> will provide to <strong>you</strong> all assistance and <strong>material</strong> as specified in the <strong>work order</strong>. <strong>You</strong> must ensure these <strong>materials</strong> are used only as the <strong>buyer</strong> specifies and in the performance of <strong>your</strong> obligations under the <strong>work order</strong>.</p>
                        <h3>16. Confidentiality</h3>
                        <p><strong>Confidential information</strong> can only be disclosed if:</p>
                        <ul>
                        <li>It is disclosed to <strong>your</strong> <strong>personnel</strong> solely to comply with obligations, or to exercise rights, under this <strong>agreement</strong> or any <strong>work order</strong>.</li>
                        <li>It is disclosed for government, administrative or accountability purposes, including making pricing available to <strong>buyers</strong> on the <strong>Digital Marketplace</strong>.</li>
                        <li>It is authorised or required by law to be disclosed.</li>
                        </ul>
                        <p><strong>Confidential information</strong> cannot be disclosed in any other circumstances without prior consent from the owner of the <strong>confidential information</strong>.</p>
                        <p><strong>You</strong> must, if requested, sign a non-disclosure agreement.</p>
                        <h3>17. Privacy obligations</h3>
                        <p><strong>You</strong> confirm that, to the best of <strong>your</strong> knowledge and belief after making reasonable inquiries, <strong>you</strong> have no <strong>conflict of interest. </strong></p>
                        <p>If an actual or potential <strong>conflict of interest</strong> arises, <strong>you</strong> must notify <strong>us, </strong>and the <strong>buyer</strong> if relevant by email, and take all steps required to manage the <strong>conflict of interest</strong> as directed by <strong>us</strong> or the <strong>buyer</strong>.</p>
                        <h3>19. Audit and access</h3>
                        <p>To support <strong>buyers </strong>in meeting their governance requirements, on request<strong> you</strong> must allow authorised representatives of the <strong>DTA</strong> or a <strong>buyer</strong> (including the Auditor- General or the Australian Information Commissioner or their delegates) access to, and permit copies to be made of, all <strong>material</strong> relating to the supply of the <strong>services</strong> or <strong>products </strong>and assist with any audits.</p>
                        <h3>20. Alternative dispute resolution</h3>
                        <p>If a dispute arises between <strong>you</strong> and a <strong>buyer</strong>, the following process must be followed before <strong>you </strong>can commence court proceedings:</p>
                        <ul>
                        <li>The party claiming that a dispute has arisen must give the other party an email dispute notice setting out the details of the dispute.</li>
                        <li><strong>You</strong> must attempt to settle the dispute by negotiating with the <strong>buyer </strong>as soon as practicably possible. </li>
                        <li>If the dispute has not been settled within 10 business days of the negotiations, <strong>you</strong> or the <strong>buyer</strong> may refer the dispute to a mediator who has been agreed on by both <strong>you</strong> and the <strong>buyer</strong>. Alternatively, <strong>you</strong> can refer the dispute to the chairperson of an accredited mediation organisation to appoint a mediator. In either case, mediation must commence within 15 business days of the referral to mediation.</li>
                        <li>Each party will bear their own costs for dispute resolution. The costs of a mediator will be split evenly between <strong>you</strong> and the <strong>buyer</strong>.</li>
                        </ul>
                        <p>If the dispute is not resolved after mediation, <strong>you</strong> or the <strong>buyer</strong> may seek remedy through the Australian Capital Territory courts.</p>
                        <h3>21. Termination and suspension</h3>
                        <p><strong>We</strong> may, at any time, by prior written notice, terminate this <strong>agreement </strong>and remove <strong>you</strong> from the <strong>Digital Marketplace</strong>, for any reason without any liability to <strong>us</strong>. </p>
                        <p>Circumstances in which <strong>we</strong> may remove <strong>you</strong> from the <strong>Digital Marketplace</strong> include an extended period of inactivity on <strong>your</strong> <strong>Digital Marketplace</strong> account.</p>
                        <p><strong>We</strong> may, by giving notice, suspend <strong>you </strong>from the <strong>Digital Marketplace</strong> for a period of time that <strong>we</strong> reasonably consider necessary if:</p>
                        <ul>
                        <li><strong>We</strong> have received substantiated negative feedback relating to a significant matter.</li>
                        <li><strong>We</strong> consider that <strong>you</strong> are not providing the <strong>services</strong> or <strong>products</strong> in accordance with this <strong>agreement</strong>, the <strong>Digital Marketplace</strong> <a href="/terms-of-use">Terms of Use</a>, or the terms of a <strong>work order</strong>.</li>
                        </ul>
                        <p>In case of <strong>your</strong> suspension from the <strong>Digital Marketplace</strong>, or the termination of this <strong>agreement</strong>, current <strong>work orders</strong> will continue unless terminated by the <strong>buyer</strong>.</p>
                        <p>Without limiting any other rights or remedies the <strong>buyer</strong> may have, the <strong>buyer</strong> may terminate all or part of a <strong>work order</strong> effective immediately by giving email notice to <strong>you</strong> if <strong>you</strong> breach a provision of this <strong>agreement</strong> or a <strong>work order</strong> where:</p>
                        <ul>
                        <li>the breach is not capable of remedy; or</li>
                        <li><strong>you</strong> fail to remedy the breach within 10 business days of receiving email notice requiring <strong>you</strong> to remedy the breach.</li>
                        </ul>
                        <p>Without limiting any other rights or remedies the <strong>buyer</strong> may have, the <strong>buyer</strong> may terminate all or part of a <strong>work order</strong> for any reason, by giving at least 5 business days&rsquo; notice by email. The <strong>buyer</strong> will only be liable to pay for <strong>services</strong> performed or <strong>products</strong> supplied in the period before the date of termination. The <strong>buyer</strong> will not be liable for loss of profit.</p>
                        <p>On receipt of the notice, <strong>you</strong> must stop work on the affected<strong> services </strong>and follow any reasonable directions given by the <strong>buyer</strong>.</p>
                        <p><strong>We</strong> may terminate this <strong>agreement </strong>and a <strong>buyer</strong> may without limiting any other rights or remedies the <strong>buyer</strong> may have<strong>, </strong>terminate a <strong>work order</strong> if you are subject to an <strong>insolvency event</strong>.</p>
                        <p><strong>You</strong> may terminate this <strong>agreement</strong> (but not any <strong>work orders</strong>) by email at any time by 20 business days' prior written notice to <strong>us</strong>.</p>
                        <h3>22. Variation</h3>
                        <p><strong>We</strong> may vary this <strong>agreement</strong> by giving <strong>you</strong> at least 20 business days' notice by email. <strong>You</strong> may terminate this <strong>agreement</strong> by written notice to <strong>us</strong> before the date when the variation is to come into effect if <strong>you</strong> do not wish to accept the variation.</p>
                        <p>The <strong>agreement</strong> applying to a <strong>work order</strong> is the <strong>agreement</strong> in place at the time the <strong>work order</strong> came into effect. </p>
                        <p>A <strong>buyer</strong> or <strong>seller</strong> cannot vary the terms of this <strong>agreement, </strong>however the terms applying to a <strong>work order</strong> will reflect the value, risk and complexity of the <strong>services</strong> or <strong>products </strong>being delivered and may be subject to additional terms agreed between the <strong>buyer</strong> and the <strong>seller</strong> in that <strong>work order</strong>.</p>
                        <p><strong>Work orders</strong> can only be varied by written agreement between <strong>you</strong> and the <strong>buyer</strong>.</p>
                        <h3>23. Waiver</h3>
                        <p>Any waiver by a party under this <strong>agreement</strong> or <strong>work order</strong> must be given by email and is effective only for the particular circumstance for which it is granted.</p>
                        <h3>24. Assignment and novation</h3>
                        <p><strong>You</strong> may not assign or novate <strong>your</strong> rights and obligations under this <strong>agreement</strong> without <strong>our</strong> prior email consent and in the case of any <strong>work order</strong>, the prior email consent of the <strong>buyer</strong>.</p>
                        <h3>25. Survival</h3>
                        <p>The termination or expiry of this <strong>agreement</strong> for any reason will not affect or extinguish the terms which are intended to survive termination or expiry. </p>
                        <p>The terms intended to survive termination are as follows:</p>
                        <ul>
                        <li>Clause 6 &ndash; Seller obligations </li>
                        <li>Clause 8 &ndash; Intellectual property rights </li>
                        <li>Clause 16 &ndash; Confidentiality</li>
                        <li>Clause 17 &ndash; Privacy obligations</li>
                        <li>Clause 19 &ndash; Audit and access </li>
                        <li>Clause 20 - Alternative dispute resolution</li>
                        </ul>
                        <h3>26. Notices</h3>
                        <p>A notice must be submitted by email and addressed to the recipient's contact person. <strong>You</strong> can change <strong>your</strong> contact person at any time by updating <strong>your</strong> seller profile on the <strong>Digital Marketplace</strong>, or for a <strong>work order</strong>, by giving email notice to the <strong>buyer</strong>.</p>
                        <h3>27. Jurisdiction</h3>
                        <p>This <strong>agreement</strong> and any <strong>work order</strong> is governed by the laws of the Australian Capital Territory. Any court proceedings are subject to the non-exclusive jurisdiction of the courts of the Australian Capital Territory.</p>
                        <h2 id="definitions">Definitions</h2>
                        <p><strong>active sellers</strong> are members of the Digital Marketplace Panel.</p>
                        <p><strong>agreement</strong> means this Master Agreement.</p>
                        <p><strong>area of expertise </strong>means a defined set of skills, knowledge and experience which are the categories of the <strong>services</strong> <strong>you</strong> provide through the <strong>Digital Marketplace</strong>.</p>
                        <p><strong>buyer</strong> means an <strong>entity</strong>, registered as a buyer on the <strong>Digital Marketplace</strong>. </p>
                        <p><strong>commencement date </strong>means the date <strong>you</strong> become an <strong>active seller.</strong></p>
                        <p><strong>confidential information</strong> means information that is by its nature regarded in law as confidential, and which is either:</p>
                        <ul>
                        <li>Designated by a party as confidential</li>
                        <li>Described in the <strong>work order</strong> as confidential</li>
                        <li>Agreed in writing by the parties as confidential</li>
                        <li>Known to be, or ought to be known to be, confidential by a party</li>
                        </ul>
                        <p>It does not include information that is, or becomes, public knowledge other than by breach of this <strong>agreement</strong> or a <strong>Work Order </strong>or any other confidentiality obligation.</p>
                        <p><strong>conflict of interest</strong> means financial or non-financial interests, or relationships, that could affect or be perceived to affect any aspect of <strong>your</strong> participation in the <strong>Digital Marketplace</strong></p>
                        <p><strong>consequential loss</strong> means any loss recoverable at law (other than arising in the usual course of things) including:</p>
                        <ol>
                        <li>a loss of income or revenue</li>
                        <li>a loss of opportunity or goodwill</li>
                        <li>a loss of profits</li>
                        <li>a loss of anticipated savings or business</li>
                        <li>a loss of value of any equipment</li>
                        </ol>
                        <p><strong>deliverable </strong>means the provision of the <strong>services,</strong> <strong>products </strong>and<strong> order material</strong> specified in the <strong>work order</strong>.</p>
                        <p><strong>DTA</strong> means the Commonwealth of Australia represented by the Digital Transformation Agency.</p>
                        <p><strong>Digital Marketplace</strong> means processes or resources made available by the <strong>DTA</strong> to facilitate <strong>buyers</strong> procuring digital <strong>products</strong> and <strong>services</strong>.</p>
                        <p><strong>entity</strong> means a person, partnership, organisation, or business that has a legal and separately identifiable existence.</p>
                        <p><strong>infringe</strong> includes an act or omission that would, apart from the operation of section 163 of the <em>Patents Act 1990</em>, section 100 of the <em>Designs Act 2003</em>, section 183 of the <em>Copyright Act 1968</em>, or section 25 of the <em>Circuit Layouts Act 1989</em>, constitute an infringement of the right.</p>
                        <p><strong>insolvency event </strong>&nbsp;means the happening of any one or more of the following:</p>
                        <ul>
                        <li><strong>you </strong>cease, or take steps to cease, to conduct <strong>your</strong> business in the normal manner</li>
                        <li><strong>you</strong> enter into or resolve to enter into any arrangement, composition or compromise with or assignment for the benefit of <strong>your</strong> creditors or any class of them</li>
                        <li><strong>you</strong> are unable to pay <strong>your</strong> debts when they are due or <strong>you</strong> are deemed under the <em>Corporations Act 2001</em> (Cth) to be insolvent</li>
                        <li>a liquidator or provisional liquidator is appointed to <strong>you</strong> or a receiver, receiver and manager, official manager, trustee or similar official is appointed over any of <strong>your</strong> assets or undertakings</li>
                        <li>an application or order is made or a resolution is passed for <strong>your</strong> winding up</li>
                        <li>if <strong>you</strong> are an individual <strong>you</strong> are declared bankrupt, seek a composition of creditors, suspend payments or in any other way are deemed to be insolvent</li>
                        <li>any act or event having a substantially similar effect to any of the events specified in the above sub- paragraphs apply</li>
                        </ul>
                        <p><strong>intellectual property rights </strong>means the rights of a creator or an owner relating to copyrights, trademarks, patents, know-how, models, drawings, designs, specifications, inventions, prototypes and software, whether or not in material form, and any application or right to apply for registration of any of these rights.</p>
                        <p><strong>loss</strong> means loss, damage, cost or expense (to any person or property) including <strong>consequential loss</strong> or indirect loss or any loss of profits, data or revenue.</p>
                        <p><strong>material</strong> means any software, firmware, documented methodology or process, documentation or other material in whatever form, including without limitation any reports, specifications, business rules or requirements, user manuals, user guides, operations manuals, training materials and instructions, and the subject matter of any category of <strong>intellectual property rights</strong>.</p>
                        <p><strong>moral rights consents </strong>means written consent or waiver to another party that would otherwise breach some or all of a creator&rsquo;s moral rights.</p>
                        <p><strong>opportunity </strong>means a buyer requirement that has been posted on the <strong>Digital Marketplace</strong> and may lead to the creation of a <strong>work order</strong>.</p>
                        <p><strong>order material</strong> means any <strong>material</strong> created by <strong>you</strong> as a result of performing its obligations under a <strong>work order</strong>, including any modifications.</p>
                        <p><strong>our</strong>, <strong>us</strong> and <strong>we</strong> means the Commonwealth of Australia represented by the Digital Transformation Agency.</p>
                        <p><strong>personnel</strong> means, in relation to a party, any natural persons who are employees, officers, agents, contractors, subcontractors or professional advisers of that party.</p>
                        <p><strong>product </strong>or<strong> products </strong>means any item or items to be delivered or provided under a <strong>work order</strong> by <strong>you</strong> to a <strong>buyer</strong>, and may include, but is not limited to, software and digital products. </p>
                        <p><strong>proprietary software</strong> means pre-existing software owned by an <strong>entity</strong> other than the buyer.</p>
                        <p><strong>registered sellers </strong>are not Digital Marketplace Panel members but have a profile, visible to buyers on the <strong>Digital Marketplace</strong> and can view opportunities. They cannot apply for opportunities but can apply to become an <strong>active seller</strong>. </p>
                        <p><strong>seller</strong> means a business who offers their <strong>products</strong> or <strong>services</strong> on the <strong>Digital Marketplace</strong>.</p>
                        <p><strong>services</strong> means the work to be performed in specific <strong>areas of expertise</strong> as described in the <strong>work order</strong>.</p>
                        <p><strong>software</strong> means the programs, programming languages, and data that direct the operations of a computer system and includes any standard form documentation that is usually provided to customers with the software.</p>
                        <p><strong>work order </strong>means a contract formed between a <strong>buyer</strong> and a <strong>seller</strong> under this <strong>agreement </strong>for the provision of <strong>services</strong>, or <strong>products, </strong>or both. </p>
                        <p><strong>you or your</strong> means the party specified as the <strong>seller</strong> and includes <strong>your personnel</strong>.</p>
                        <p>Last updated: 23 February 2017</p>
                    </div>
                    <br/>
                    <StatefulError
                        model={`${model}.agreed_to_master_agreement`}
                        id="agree"
                        messages={{
                            required: 'You must accept the Master Agreement'
                        }}
                    />
                    <Control.checkbox
                        model={`${model}.agreed_to_master_agreement`}
                        id="agree"
                        name="agree"
                        validators={{required}}
                    />
                    <label htmlFor="agree">I am <strong>{representative}</strong>, an authorised representative of
                        <strong> {name}</strong> (ABN: {abn}) and I agree to the terms set out in the <a
                            href="/static/media/documents/digital-marketplace-master-agreement.pdf" rel="external" target="_blank">Marketplace Master
                            Agreement</a>.</label>

                </div>
            )
        }
        else {


            message = (
                <div>
                    <p>Only the authorised representative, <strong>{representative}</strong>, can accept the Master Agreement terms on behalf of <strong>{name}</strong>.</p>
                    <p>Would you like us to send an email now to <strong>{email}</strong> so they can complete the last step?</p>
                </div>
            )
        }
        return (
            <div>
                <h1 tabIndex="-1">{title}</h1>
                <Form model={model}
                      action={action}
                      method="post"
                      id="submit"
                      component={SubmitForm}
                      valid={form.valid}
                      onSubmit={onSubmit}
                >
                    <ErrorBox focusOnMount={true} model={model}/>
                    {!applicationValid &&
                    (<div ref="box" className="callout--warning" aria-describedby="validation-masthead-heading" tabIndex="-1" role="alert">
                        <h4 id="validation-masthead-heading">All steps must be completed before submitting. You are yet to complete the following sections: {stepsRemaining}</h4></div>)
                    }

                    <input type="hidden" name="csrf_token" id="csrf_token" value={csrfToken}/>
                    { message }
                    {applicationValid
                        ? <button type="submit">{buttonText}</button>
                        : <button disabled="disabled">{buttonText}</button>
                    }
                </Form>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {

    return {
        submitUrl: state.form_options.submit_url,
        authoriseUrl: state.form_options.authorise_url,
        applicationValid: ownProps.applicationValid,
        name: ownProps.name,
        abn: ownProps.abn,
        email: ownProps.email,
        representative: ownProps.representative,
        userEmail: state.form_options.user_email,
        csrfToken: state.form_options.csrf_token,
        ...formProps(state, ownProps.formName || 'submitStepForm'),
    }
}

export {
    mapStateToProps,
    SubmitStepForm as Form
}

export default connect(mapStateToProps)(SubmitStepForm);
