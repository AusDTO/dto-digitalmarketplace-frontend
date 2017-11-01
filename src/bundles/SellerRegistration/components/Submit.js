import React from 'react';
import PropTypes from 'prop-types'
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
        model: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ]).isRequired,
        form: PropTypes.object.isRequired,
        submitUrl: PropTypes.string,
        authoriseUrl: PropTypes.string,
        onClick: PropTypes.func,
        applicationValid: PropTypes.bool,
        stepsRemaining: PropTypes.string,
        name: PropTypes.string,
        abn: PropTypes.string,
        email: PropTypes.string,
        representative: PropTypes.string,
        userEmail: PropTypes.string,
        csrfToken: PropTypes.string
    };

    handleSubmit(val) {
        // Do anything you want with the form value
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
                        <li>Complete the declaration</li>
                    </ol>
                    <a href="/static/media/documents/digital-marketplace-master-agreement.pdf" rel="external" target="_blank">Download Master Agreement (PDF 229KB)</a><br/>
                    <a href="/static/media/documents/digital-marketplace-master-agreement.html" target="_blank" rel="external">View Master Agreement in HTML</a><br/><br/>


                    <div style={agreementStyle}>
                        <h1>Master Agreement</h1>
                        <h2>Introduction and scope</h2>
                        <p>This agreement covers all your interactions in the Digital Marketplace, including selling to buyers. This agreement also forms part of the terms incorporated into every work order contract agreed to by you and a buyer. </p>
                        <p>Before you can join the Digital Marketplace as a registered seller and join the Digital Marketplace Panel as an active seller, a person authorised to enter arrangements on behalf of your organisation must accept this agreement. </p>
                        <p>This agreement will be updated from time to time to reflect the evolution of the Digital Marketplace. If you choose not to accept an update you will lose seller status. Existing work orders awarded to you will remain in force until completed or terminated according to the terms of the work order.</p>
                        <p>The drafting principles we have used are:</p>
                        <ul>
                        <li>This agreement contains foundational terms which provide contractual protection for all purchases in the Digital Marketplace under work orders. It is designed to work with work orders to enable customisation of contracts between buyers and sellers for a particular opportunity.</li>
                        <li>We do not restate any common law principles or existing legal requirements that apply to you (for example, privacy and workplace health and safety (WHS) obligations).</li>
                        <li>Words have a special legal meaning outlined in the <a href="#definitions">definitions section</a>.</li>
                        <li>Where possible, we explain terms as we go rather than relying on definitions.</li>
                        </ul>
                        <h2>Terms</h2>
                        <h3>1. General</h3>
                        <p>This agreement is between you and the DTA.</p>
                        <p>This agreement begins on the commencement date and continues until terminated by either party.</p>
                        <p>We may invite other sellers to join and do business on the Digital Marketplace at any time.</p>
                        <p>We may add, remove or update areas of expertise at any time. </p>
                        <p>We may publish information relating to this agreement and work orders in line with the <a href="http://standard.open-contracting.org/latest/en/">Open Contracting Data Standard</a>. </p>
                        <p>You agree that the inclusion of your details on the Digital Marketplace under this agreement is of value to you and sufficient consideration for this agreement to be binding. </p>
                        <p>You must not represent that you are an employee, partner, officer or agent of the DTA or a buyer.</p>
                        <h3>2. Priority of documents</h3>
                        <p>There will be times when the nature of an opportunity means that you or the buyer need to add to this agreement. A buyer may highlight additional terms in their posted opportunity or subsequently. You and the buyer must agree on any additional terms and include them in the work order. You cannot amend any parts of this agreement that relate to your contractual relationship with us with additional terms.</p>
                        <p>If there is any inconsistency in the documents forming a work order, those documents will be interpreted in the following order of priority:</p>
                        <ol>
                        <li>Additional terms to this agreement included in the work order.</li>
                        <li>This agreement.</li>
                        <li>The details contained in the work order.</li>
                        <li>Any attachments to the work order.</li>
                        <li>Any other document referred to in the work order.</li>
                        </ol>
                        <h3>3. Work orders</h3>
                        <p>A work order is not effective until accepted by both the buyer and the seller. </p>
                        <p>Once effective, work orders create a separate contract on the terms of this agreement and any terms specified in the work order.</p>
                        <h3>4. Adding services and products</h3>
                        <p>You may offer additional services or products for possible inclusion in the Digital Marketplace at any time by following the process in the Digital Marketplace.</p>
                        <h3>5. Non-exclusive arrangement</h3>
                        <p>This agreement is not exclusive and does not guarantee that you will receive opportunities or work orders and does not prevent buyers from buying services or products elsewhere.</p>
                        <h3>6. Seller obligations</h3>
                        <p>You must supply the services or products specified in a work order:</p>
                        <ul>
                        <li>To the reasonable satisfaction of the buyer and to the standard set out in the work order.</li>
                        <li>In a manner that equals or exceeds the standard expected of a seller experienced and qualified in the performance of similar services or provision of similar products.</li>
                        <li>In accordance with the <a href="https://www.dta.gov.au/standard/">Digital Service Standard</a> and any other relevant standards, industry better practice and guidelines, including any specified in the work order.</li>
                        <li>In accordance with the buyer policies, legal and specific terms or requirements, set out in a work order or notified to you in writing.</li>
                        <li>You must advise us immediately if you become non-compliant with any of these requirements.</li>
                        </ul>
                        <p>You must ensure:</p>
                        <ul>
                        <li>You have all rights, titles, licences, interests and property necessary to lawfully perform the services or provide the products.</li>
                        <li>The products or services will be fit for the purpose as set out in the applicable work order.</li>
                        <li>You will continue to hold all insurance policies specified in the work order or as are appropriate for the services or provision of the products.</li>
                        <li>You update your disclosures by editing your Digital Marketplace seller profile if any of the information relating to your disclosures changes.</li>
                        </ul>
                        <p>If you do not do these things DTA may terminate this agreement and a buyer may terminate any affected work order without liability to us or the buyer.</p>
                        <h3>7. Licences, warranties and documentation</h3>
                        <p>You must transfer to the buyer all licences and warranties for any services or products and any documentation needed by the buyer to fully use the services or products.</p>
                        <h3>8. Intellectual property rights</h3>
                        <p>General</p>
                        <p>You must ensure that the buyer&rsquo;s use of the order material will not infringe the intellectual property rights of any person.</p>
                        <p>You must obtain any moral rights consents in writing necessary for the buyer to use the order material. </p>
                        <p>If someone claims intellectual property rights over any material, you must, at your cost, either:</p>
                        <ul>
                        <li>Ensure that the buyer can continue to use the relevant material without liability or infringement; or </li>
                        <li>Replace or modify the material so that it does not infringe the intellectual property rights of any other party, without degrading the performance or quality of the material.</li>
                        </ul>
                        <p>Software intellectual property and licensing</p>
                        <p>Unless otherwise agreed in a work order, for order material that is software but not proprietary software:</p>
                        <ul>
                        <li>The software shall be open source, or capable of being open source and licenced, or capable of being licenced, under a Creative Commons Attribution Licence 4.0 International CC-NC.</li>
                        <li>To the extent that software is not open source, as specified in the work order, the intellectual property rights will vest in the seller and the seller will give the buyer a perpetual, irrevocable, fully paid up, royalty-free, worldwide, non-exclusive licence to reproduce, publish, use, modify, adapt, communicate and reproduce the software, including the right to engage third parties to modify or adapt the software, and the right to sublicense or transfer the licence to the government&rsquo;s central pool of licences for the relevant level of government, but not the right to commercially exploit the software.</li>
                        <li>No other software terms (including your standard software licensing terms) apply to the work order.</li>
                        </ul>
                        <p>Order material other than software</p>
                        <p>Intellectual property rights in any order material other than software and standard form documentation relating to the software supplied to the seller&rsquo;s customers hereby vest in the buyer from the date they come into existence. In this context, &ldquo;hereby&rdquo; is a legal term meaning at this time, to the greatest extent possible, but without creating any additional documentation. </p>
                        <p>You must ensure the buyer is provided with any intellectual property rights licence or usage rights it needs to use any material provided with (or needed for the use of) the order material.</p>
                        <h3>9. Delivery</h3>
                        <p>If you are unable to provide all or part of the services or products specified in a work order in a reasonable timeframe, you must notify the buyer immediately. </p>
                        <p>The buyer will accept deliverables according the requirements in a work order.</p>
                        <p>Deliverables and products become the property of the buyer on delivery subject only to them being paid for. Risk in deliverables and products transfers on acceptance of the order material.</p>
                        <h3>10. Specified personnel, security and safety</h3>
                        <p>Where a work order specifies named personnel, you must only use the named personnel and not replace, reduce or supplement them without prior written approval from the buyer. </p>
                        <p>If you are required to obtain security clearances, you are responsible for any costs associated with doing so and any failure to obtain clearances or obtain them within any timeframe does not provide an excuse to the seller for failing to perform any services or provide any products on time.</p>
                        <p>You must comply with all security, health, workplace and safety and any other requirements set out in the work order or that are applicable to the work, premises or location at which the services or products are being delivered.</p>
                        <p>You must not copy, transmit or remove any data without prior written approval from the buyer.</p>
                        <h3>11. Subcontracting</h3>
                        <p>Except as set out in the work order, you must not subcontract any aspect of the services without obtaining the buyer&rsquo;s prior written consent.</p>
                        <h3>12. Payment and expenses</h3>
                        <p>If the products or services meet the requirements of the work order, the buyer will pay you.</p>
                        <p>You must provide a correctly rendered tax invoice to the buyer containing the information required by the buyer as specified in the work order.The buyer will pay you within 30 days of the buyer receiving a correct tax invoice.</p>
                        <p>You must not charge the buyer for any supply or expense not specified in the work order (for example, travel).</p>
                        <h3>13. Interest for late payment</h3>
                        <p>Buyers will pay interest for late payments in accordance with the relevant government policy. At the Commonwealth level, the Supplier Pay On-Time or Pay Interest Policy applies.</p>
                        <h3>14. Taxes</h3>
                        <p>You must pay all taxes, duties and government charges that are due in Australia or overseas in connection with a work order.</p>
                        <p>Prices in a work order are exclusive of GST. On receipt of a correctly rendered tax invoice, the buyer will pay you the GST exclusive amount plus any GST that applies.</p>
                        <h3>15. Buyer material</h3>
                        <p>The buyer will provide to you all assistance and material as specified in the work order. You must ensure these materials are used only as the buyer specifies and in the performance of your obligations under the work order.</p>
                        <h3>16. Confidentiality</h3>
                        <p>Confidential information can only be disclosed if:</p>
                        <ul>
                        <li>It is disclosed to your personnel solely to comply with obligations, or to exercise rights, under this agreement or any work order.</li>
                        <li>It is disclosed for government, administrative or accountability purposes, including making pricing available to buyers on the Digital Marketplace.</li>
                        <li>It is authorised or required by law to be disclosed.</li>
                        </ul>
                        <p>Confidential information cannot be disclosed in any other circumstances without prior consent from the owner of the confidential information.</p>
                        <p>You must, if requested, sign a non-disclosure agreement.</p>
                        <h3>17. Privacy obligations</h3>
                        <p>You agree, in providing the services or products:
                        <ul>
                            <li>Not to breach any requirement of the <i>Privacy Act 1988</i> (Cth) that applies to you in the fulfilment of a work order.</li>
                            <li>Not to do anything, that if done by the buyer, would be a breach of an Australian Privacy Principle under the <i>Privacy Act 1988</i> (Cth).</li>
                            <li>To comply with any directions, guidelines, determinations or recommendations referred to in the work order or made by the Australian Information Commissioner.</li>
                            <li>To notify the buyer immediately if you become aware of a breach or possible breach of any of your privacy obligations.</li>
                        </ul>
                        </p>
                        <h3>18. Conflict of interest</h3>
                        <p>You confirm that, to the best of your knowledge and belief after making reasonable inquiries, you have no conflict of interest. </p>
                        <p>If an actual or potential conflict of interest arises, you must notify us, and the buyer if relevant by email, and take all steps required to manage the conflict of interest as directed by us or the buyer.</p>
                        <h3>19. Audit and access</h3>
                        <p>To support buyers in meeting their governance requirements, on request you must allow authorised representatives of the DTA or a buyer (including the Auditor- General or the Australian Information Commissioner or their delegates) access to, and permit copies to be made of, all material relating to the supply of the services or products and assist with any audits.</p>
                        <h3>20. Alternative dispute resolution</h3>
                        <p>If a dispute arises between you and a buyer, the following process must be followed before you can commence court proceedings:</p>
                        <ul>
                        <li>The party claiming that a dispute has arisen must give the other party an email dispute notice setting out the details of the dispute.</li>
                        <li>You must attempt to settle the dispute by negotiating with the buyer as soon as practicably possible. </li>
                        <li>If the dispute has not been settled within 10 business days of the negotiations, you or the buyer may refer the dispute to a mediator who has been agreed on by both you and the buyer. Alternatively, you can refer the dispute to the chairperson of an accredited mediation organisation to appoint a mediator. In either case, mediation must commence within 15 business days of the referral to mediation.</li>
                        <li>Each party will bear their own costs for dispute resolution. The costs of a mediator will be split evenly between you and the buyer.</li>
                        </ul>
                        <p>If the dispute is not resolved after mediation, you or the buyer may seek remedy through the Australian Capital Territory courts.</p>
                        <h3>21. Termination and suspension</h3>
                        <p>We may, at any time, by prior written notice, terminate this agreement and remove you from the Digital Marketplace, for any reason without any liability to us. </p>
                        <p>Circumstances in which we may remove you from the Digital Marketplace include an extended period of inactivity on your Digital Marketplace account.</p>
                        <p>We may, by giving notice, suspend you from the Digital Marketplace for a period of time that we reasonably consider necessary if:</p>
                        <ul>
                        <li>We have received substantiated negative feedback relating to a significant matter.</li>
                        <li>We consider that you are not providing the services or products in accordance with this agreement, the Digital Marketplace <a href="/terms-of-use">Terms of Use</a>, or the terms of a work order.</li>
                        </ul>
                        <p>In case of your suspension from the Digital Marketplace, or the termination of this agreement, current work orders will continue unless terminated by the buyer.</p>
                        <p>Without limiting any other rights or remedies the buyer may have, the buyer may terminate all or part of a work order effective immediately by giving email notice to you if you breach a provision of this agreement or a work order where:</p>
                        <ul>
                        <li>the breach is not capable of remedy; or</li>
                        <li>you fail to remedy the breach within 10 business days of receiving email notice requiring you to remedy the breach.</li>
                        </ul>
                        <p>Without limiting any other rights or remedies the buyer may have, the buyer may terminate all or part of a work order for any reason, by giving at least 5 business days&rsquo; notice by email. The buyer will only be liable to pay for services performed or products supplied in the period before the date of termination. The buyer will not be liable for loss of profit.</p>
                        <p>On receipt of the notice, you must stop work on the affected services and follow any reasonable directions given by the buyer.</p>
                        <p>We may terminate this agreement and a buyer may without limiting any other rights or remedies the buyer may have, terminate a work order if you are subject to an insolvency event.</p>
                        <p>You may terminate this agreement (but not any work orders) by email at any time by 20 business days' prior written notice to us.</p>
                        <h3>22. Variation</h3>
                        <p>We may vary this agreement by giving you at least 20 business days' notice by email. You may terminate this agreement by written notice to us before the date when the variation is to come into effect if you do not wish to accept the variation.</p>
                        <p>The agreement applying to a work order is the agreement in place at the time the work order came into effect. </p>
                        <p>A buyer or seller cannot vary the terms of this agreement, however the terms applying to a work order will reflect the value, risk and complexity of the services or products being delivered and may be subject to additional terms agreed between the buyer and the seller in that work order.</p>
                        <p>Work orders can only be varied by written agreement between you and the buyer.</p>
                        <h3>23. Waiver</h3>
                        <p>Any waiver by a party under this agreement or work order must be given by email and is effective only for the particular circumstance for which it is granted.</p>
                        <h3>24. Assignment and novation</h3>
                        <p>You may not assign or novate your rights and obligations under this agreement without our prior email consent and in the case of any work order, the prior email consent of the buyer.</p>
                        <h3>25. Survival</h3>
                        <p>The termination or expiry of this agreement for any reason will not affect or extinguish the terms which are intended to survive termination or expiry. </p>
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
                        <p>A notice must be submitted by email and addressed to the recipient's contact person. You can change your contact person at any time by updating your seller profile on the Digital Marketplace, or for a work order, by giving email notice to the buyer.</p>
                        <h3>27. Jurisdiction</h3>
                        <p>This agreement and any work order is governed by the laws of the Australian Capital Territory. Any court proceedings are subject to the non-exclusive jurisdiction of the courts of the Australian Capital Territory.</p>
                        <h2 id="definitions">Definitions</h2>
                      <ul>
                        <li>"active sellers" are members of the Digital Marketplace Panel.</li>
                        <li>"agreement" means this Master Agreement.</li>
                        <li>"area of expertise" means a defined set of skills, knowledge and experience which are the categories
                          of the services you provide through the Digital Marketplace.</li>
                        <li>"buyer" means an entity, registered as a buyer on the Digital
                          Marketplace. </li>
                        <li>"commencement date" means the date you become an active seller.</li>
                        <li>"confidential information" means information that is by its nature regarded in law as confidential,
                          and which is either:
                          <ul>
                            <li>Designated by a party as confidential</li>
                            <li>Described in the work order as confidential</li>
                            <li>Agreed in writing by the parties as confidential</li>
                            <li>Known to be, or ought to be known to be, confidential by a party</li>
                          </ul>
                          It does not include information that is, or becomes, public knowledge other than by breach of this
                          agreement or a Work Order or any other confidentiality obligation.</li>
                        <li>"conflict of interest" means financial or non-financial interests, or relationships, that could affect
                          or be perceived to affect any aspect of your participation in the Digital
                          Marketplace</li>
                        <li>"consequential loss" means any loss recoverable at law (other than arising in the usual course of
                          things) including:</li>
                        <ol>
                          <li>a loss of income or revenue</li>
                          <li>a loss of opportunity or goodwill</li>
                          <li>a loss of profits</li>
                          <li>a loss of anticipated savings or business</li>
                          <li>a loss of value of any equipment</li>
                        </ol>
                        <li>"deliverable" means the provision of the services,
                          products and order material specified in the work order.</li>
                        <li>"DTA" means the Commonwealth of Australia represented by the Digital Transformation Agency.</li>
                        <li>"Digital Marketplace" means processes or resources made available by the DTA to
                          facilitate buyers procuring digital products and services.</li>
                        <li>"entity" means a person, partnership, organisation, or business that has a legal and separately
                          identifiable existence.</li>
                        <li>"infringe" includes an act or omission that would, apart from the operation of section 163 of the <em>Patents
                          Act 1990</em>, section 100 of the <em>Designs Act 2003</em>, section 183 of the <em>Copyright Act 1968</em>, or
                          section 25 of the <em>Circuit Layouts Act 1989</em>, constitute an infringement of the right.</li>
                        <li>"insolvency event" &nbsp;means the happening of any one or more of the following:</li>
                        <ul>
                          <li>you cease, or take steps to cease, to conduct your business in the normal manner.
                          </li>
                          <li>you enter into or resolve to enter into any arrangement, composition or compromise with or
                            assignment for the benefit of your creditors or any class of them.
                          </li>
                          <li>you are unable to pay your debts when they are due or you are
                            deemed under the <em>Corporations Act 2001</em> (Cth) to be insolvent.
                          </li>
                          <li>a liquidator or provisional liquidator is appointed to you or a receiver, receiver and manager,
                            official manager, trustee or similar official is appointed over any of your assets or undertakings.
                          </li>
                          <li>an application or order is made or a resolution is passed for your winding up</li>
                          <li>if you are an individual you are declared bankrupt, seek a composition of
                            creditors, suspend payments or in any other way are deemed to be insolvent.
                          </li>
                          <li>any act or event having a substantially similar effect to any of these events
                          </li>
                        </ul>
                        <li>"intellectual property rights" means the rights of a creator or an owner relating to copyrights,
                          trademarks, patents, know-how, models, drawings, designs, specifications, inventions, prototypes and software, whether
                          or not in material form, and any application or right to apply for registration of any of these rights.</li>
                        <li>"loss" means loss, damage, cost or expense (to any person or property) including consequential
                          loss or indirect loss or any loss of profits, data or revenue.</li>
                        <li>"material" means any software, firmware, documented methodology or process, documentation or other
                          material in whatever form, including without limitation any reports, specifications, business rules or requirements,
                          user manuals, user guides, operations manuals, training materials and instructions, and the subject matter of any
                          category of intellectual property rights.</li>
                        <li>"moral rights consents" means written consent or waiver to another party that would otherwise breach
                          some or all of a creator&rsquo;s moral rights.</li>
                        <li>"opportunity" means a buyer requirement that has been posted on the Digital
                          Marketplace and may lead to the creation of a work order.</li>
                        <li>"order material" means any material created by you as a result of
                          performing its obligations under a work order, including any modifications.</li>
                        <li>"our", "us" and "we" means the Commonwealth of Australia represented by
                          the Digital Transformation Agency.</li>
                        <li>"personnel" means, in relation to a party, any natural persons who are employees, officers, agents,
                          contractors, subcontractors or professional advisers of that party.</li>
                        <li>"product" or "products" means any item or items to be delivered or provided under a
                          work order by you to a buyer, and may include, but is not limited
                          to, software and digital products. </li>
                        <li>"proprietary software" means pre-existing software owned by an entity other than the
                          buyer.</li>
                        <li>"registered sellers" are not Digital Marketplace Panel members but have a profile, visible to buyers
                          on the Digital Marketplace and can view opportunities. They cannot apply for opportunities but can
                          apply to become an active seller. </li>
                        <li>"seller" means a business who offers their products or services on
                          the Digital Marketplace.</li>
                        <li>"services" means the work to be performed in specific areas of expertise as described
                          in the work order.</li>
                        <li>"software" means the programs, programming languages, and data that direct the operations of a
                          computer system and includes any standard form documentation that is usually provided to customers with the software.
                        </li>
                        <li>"work order" means a contract formed between a buyer and a seller
                          under this agreement for the provision of services, or products, or
                          both. </li>
                        <li>"you" or "your" means the party specified as the seller and includes your
                          personnel.</li>
                      </ul>
                        <p>Last updated: 20 October 2017</p>
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

                  <a href="/static/media/documents/digital-marketplace-master-agreement.pdf" rel="external" target="_blank">Download Master Agreement (PDF 229KB)</a><br/><br/>
                  <a href="/static/media/documents/digital-marketplace-master-agreement.html" target="_blank" rel="external">View Master Agreement in HTML</a><br/><br/>

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
                      <h4 id="validation-masthead-heading">All steps must be completed before submitting.</h4>
                      You are yet to complete the following sections: {stepsRemaining}</div>)
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
