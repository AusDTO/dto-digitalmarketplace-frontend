import React from 'react';
import {connect} from 'react-redux';

const agreementStyle = {
    width: '100%',
    outlineOffset: 0,
    border: '2px solid #bebebe',
    borderRadius: 0,
    backgroundColor: '#fff',
    padding: '.4rem',
    height: '14.375rem',
    overflowY: 'scroll'
}

const Submit = ({submitUrl, applicationValid, onClick, name, userEmail, authoriseUrl, email, csrfToken}) => {
    let message;
    const userIsAuthorised = userEmail === email;
    const buttonText = userIsAuthorised ? 'Submit my application' : 'Send email to representative';
    const action = userIsAuthorised ? submitUrl : authoriseUrl;
    if (userIsAuthorised) {
        message = (
            <div>
                <p>I am the authorised representative of <strong>{name}</strong></p>
                <a href="/document/masteragreement.pdf">Download Master Agreement</a><br/><br/>

                <div style={agreementStyle}><p><strong>Master Agreement</strong> <br /><br /><strong>1. Introduction and scope</strong></p>
<p><br />This <strong>agreement</strong> covers all your interactions in the <strong>Digital Marketplace,</strong> including selling to buyers. This <strong>agreement</strong> also forms part of the terms incorporated into every <strong>Work Order</strong> contract agreed to by you and a <strong>buyer</strong>. </p>

<p>Before you can join the Marketplace as a <strong>registered seller </strong>and join the Marketplace panel as an <strong>active seller</strong> you will need to accept this <strong>agreement</strong>. </p>

<p>Words in <strong>bold</strong> have a special legal meaning outlined in the definitions section</p>
<ol start="2">
<li><strong> Terms</strong></li>
</ol>

<p><strong>2.1 General</strong><strong><br /></strong><strong><br /></strong>This <strong>agreement </strong>is between<strong> you</strong> and the <strong>DTA</strong>.<br /><br />This <strong>agreement</strong> begins on the <strong>commencement date</strong> and continues until terminated by either party.</p>

<p><strong>We</strong> may invite other <strong>sellers</strong> to join and do business on the <strong>Digital Marketplace</strong> at any time.</p>

<p><strong>We</strong> may add, remove or update <strong>areas of expertise </strong>at any time. </p>

<p>The parties agree that the inclusion of your details on the <strong>Digital Marketplace</strong> under this <strong>agreement</strong> is of value to <strong>you</strong> and sufficient consideration for this <strong>agreement</strong> to be binding. </p>

<p><strong>2.2 Priority of documents</strong></p>

<p>If there is any inconsistency in the documents forming a <strong>Work Order</strong>, those documents will be interpreted in the following order of priority.</p>

<ol>
<li >This <strong>agreement</strong></li>
<li >The <strong>Work Order</strong></li>
<li >Any attachments to the <strong>Work Order</strong></li>
<li >Any other document</li>
</ol>

<p><strong>2.3 Adding new service areas</strong></p>

<p>You may offer additional <strong>areas of expertise</strong> for possible inclusion in the <strong>Digital Marketplace</strong> at any time by following the process in the Digital Marketplace, including providing relevant supporting case studies and references.</p>

<p>We will assess your offer for additional <strong>areas of expertise</strong> and advise <strong>you </strong>on the outcome.</p>

<p><strong>2.4 Non-exclusive arrangement</strong></p>

<p>This <strong>agreement</strong> is not exclusive and does not guarantee that you will receive requests for work or <strong>Work Orders</strong> and doesn&rsquo;t prevent <strong>buyers</strong> from buying services elsewhere. </p>

<p><strong>2.5 Request for quotations</strong></p>
<p><strong><br /></strong>A <strong>buyer</strong> may issue a brief requesting a quotation for the <strong>services</strong>. If a <strong>buyer</strong> wishes to proceed with your quotation, the <strong>buyer</strong> will issue a <strong>Work Order</strong> to <strong>you</strong>.</p>

<p><strong>2.6 Work Orders</strong></p>
<p><strong><br /></strong>A <strong>Work Order</strong> is effective when the completed <strong>Work Order</strong> is accepted by both the <strong>buyer </strong>and the <strong>seller</strong>. </p>

<p>Once effective, <strong>Work Orders</strong> create a separate contract on the terms of this <strong>agreement</strong> and any terms specified in the <strong>Work Order</strong>.</p>

<p><strong>2.7 Seller obligations</strong><strong><br /></strong><strong><br /></strong>You must supply the <strong>products</strong> or <strong>services</strong> specified in a <strong>Work Order</strong>:</p>

<ul>
<li >To the reasonable satisfaction of the <strong>buyer </strong>and to the standard or service level set out in the <strong>Work Order.</strong></li>
</ul>

<ul>
<li >In a manner that equals or exceeds the standard expected of a seller experienced and qualified in the performance of similar <strong>services</strong> or provision of similar <strong>products</strong>.<br /><br /></li>
<li >In accordance with relevant standards, industry better practice and guidelines including any specified in the <strong>Work Order</strong>.</li>
</ul>

<ul>
<li >In accordance with the <strong>buyer</strong> policies, legal and specific requirements, set out in a <strong>Work Order</strong> or notified to <strong>you</strong> in writing.</li>
</ul>

<ul>
<li >In accordance with all applicable laws and advise <strong>us</strong> immediately if you become non-compliant.</li>
</ul>

<p>You must ensure:</p>

<ul>
<li ><strong>You</strong> and <strong>your personnel </strong>have all rights, title, licences, interests and property necessary to lawfully perform the <strong>services</strong> or provide the <strong>product/s</strong>.</li>
</ul>

<ul>
<li >The <strong>product/s </strong>or<strong> services</strong> will be fit for the purpose as set out in the applicable <strong>Work Order</strong>, and will be complete and accurate.</li>
</ul>

<ul>
<li ><strong>You</strong> will continue to hold worker's compensation insurance as may be required by law and all insurance policies specified in the <strong>Work Order</strong> or as are appropriate for the <strong>services </strong>or provision of the <strong>product/s</strong>.</li>
</ul>

<p>If a <strong>Work Order</strong> includes the provision of <strong>software</strong>:</p>

<ul>
<li ><strong>You</strong> grant the <strong>buyer</strong> a non-exclusive licence of the <strong>software</strong> which (unless the <strong>Work Order</strong> sets out otherwise), includes the right to copy, configure, use, disclose and electronically transmit the <strong>software</strong> and to sublicense or transfer the licence to the government&rsquo;s central pool of licences for the relevant level of government.</li>
</ul>

<ul>
<li >Unless otherwise agreed in a <strong>Work Order</strong>, no other <strong>software</strong> terms (including <strong>your</strong> standard software licensing terms) apply to the<strong> Work Order</strong>.</li>
</ul>

<ul>
<li >You must install and integrate the <strong>software</strong> and provide appropriate training to the <strong>buyer</strong>&rsquo;s personnel (unless the <strong>Work Order</strong> sets out otherwise).</li>
</ul>

<ul>
<li >You must provide all documentation needed by the <strong>buyer</strong> to fully use the <strong>software</strong>.</li>
</ul>

<p><strong>2.8 Licences, approvals and warranties</strong></p>
<p><strong><br /></strong>You must pass through to the <strong>buyer</strong> all third-party and manufacturer's warranties for any <strong>software</strong>.</p>

<p><strong>2.9 Delivery and acceptance</strong></p>
<p><strong><br /></strong>The <strong>services</strong> or <strong>products</strong> must meet any requirements and standards specified in the <strong>Work Order</strong>. </p>

<p>If <strong>you</strong> are unable to provide all or part of the <strong>services</strong> or <strong>product/s</strong> specified in the <strong>Work Order</strong>, <strong>you</strong> must notify the <strong>buyer</strong> immediately and advise when <strong>you</strong> will be able to provide the <strong>services </strong>or<strong> product/s</strong>. </p>

<p>If the <strong>services</strong> or <strong>product/s</strong> do not comply with the requirements of the <strong>Work Order</strong>, the <strong>buyer</strong> may reject the <strong>services</strong> or <strong>product/s</strong> within 10 business days of <strong>delivery</strong> by written notice to <strong>you</strong>, which clearly states the reason for rejection and the remedy needed before the <strong>buyer</strong> can accept them. </p>

<p><strong>2.10 Specified personnel and security</strong></p>

<p>You must only use the <strong>personnel</strong> &nbsp;specified in a <strong>Work Order</strong> and not replace, reduce or supplement them without prior written approval from the <strong>buyer</strong>. </p>

<p>Your <strong>personnel</strong> must comply with all security requirements set out in the <strong>Work Order</strong> or that are applicable to the premises or location at which the <strong>services</strong> or <strong>products</strong> are being delivered.</p>

<p><strong>2.11 Subcontracting</strong></p>

<p>Except as set out in the <strong>Work Order</strong>, <strong>you</strong> must not subcontract any aspect of the <strong>services</strong> without obtaining the <strong>buyer</strong>&rsquo;s prior written consent.</p>
<p><br /><br /></p>
<p><strong>2.12 Payment and expenses</strong></p>

<p>If the <strong>products </strong>or<strong> services</strong> meet the requirements of the <strong>Work Order</strong>, the <strong>buyer</strong> will pay <strong>you</strong>.</p>

<p><strong>You</strong> must provide a correctly rendered tax invoice to the <strong>buyer</strong> containing the information required by the <strong>buyer</strong> as specified in the <strong>Work Order</strong> and the <strong>buyer</strong> will pay <strong>you</strong> within 30 days of its receipt of a correct tax invoice.</p>

<p><strong>2.13 Interest for late payment</strong></p>

<p>The <strong>buyer</strong> will pay interest for late payments in accordance with the Commonwealth Supplier Pay On-Time or Pay Interest Policy or any policy that replaces it.</p>

<p><strong>2.14 Taxes</strong></p>

<p>Both parties must comply with the <em>A New Tax System (Goods and Services Tax) Act 1999</em> (Cth).</p>

<p><strong>You</strong> must pay all taxes, duties and government charges that are due in Australia or overseas in connection with a <strong>Work Order</strong>.</p>

<p>Unless otherwise indicated in a <strong>Work Order</strong>, any consideration for any supply made under the <strong>Work Order</strong> is exclusive of any GST imposed on the supply.</p>

<p>If <strong>you</strong> make a taxable supply to the <strong>buyer</strong>, on receipt of a tax invoice from <strong>you</strong>, the <strong>buyer</strong> will pay without setoff an additional amount to <strong>you</strong> equal to the GST imposed on the supply in question.</p>

<p><strong>2.15 Buyer material</strong></p>

<p>The <strong>buyer</strong> will provide to <strong>you</strong> all assistance and <strong>material</strong> as specified in the <strong>Work Order</strong>. You must ensure that these <strong>materials</strong> are used only in the performance of your obligations under the <strong>Work Order</strong>. </p>

<p><strong>2.16 Intellectual property rights</strong></p>

<p>Intellectual property rights in any <strong>order material</strong> vest in the <strong>buyer</strong> from the date they come into existence. &nbsp;You must ensure the <strong>buyer</strong> is provided with any intellectual property rights licence or usage rights it needs to use any <strong>material </strong>provided with (or needed for the use of) the <strong>order material</strong>. </p>

<p>You must ensure that the<strong> buyer</strong>&rsquo;s use of the <strong>order material</strong> will not infringe the intellectual property rights of any person.</p>

<p>You must obtain any moral rights consents in writing necessary for the <strong>buyer</strong> to use the order material. </p>

<p><strong>2.17 Confidentiality</strong></p>

<p><strong>You</strong> must not, without the prior written consent of the disclosing party, disclose any of the disclosing party's <strong>confidential information</strong>.</p>

<p><strong>You</strong> must, if requested, arrange for <strong>your personnel</strong> to sign a non-disclosure agreement in a format set by <strong>us</strong>.</p>

<p><strong>You</strong> will not be in breach of this clause if confidential information of the other party:<br /><br /></p>
<ul>
<li >Is disclosed to your <strong>personnel</strong> solely to comply with obligations, or to exercise rights, under this <strong>agreement</strong> or any <strong>Work Order</strong>.</li>
</ul>
<ul>
<li >Is disclosed for government, administrative or accountability purposes, including making pricing available to <strong>buyers</strong> on the Digital Marketplace.</li>
<li >Is required by law to be disclosed.</li>
</ul>

<p><strong>2.18 Privacy obligations</strong></p>

<p>You agree, in providing the <strong>services </strong>or<strong> product/s:</strong></p>
<ul>
<li >Not to do anything, that if done by the <strong>buyer</strong>, would be a breach of an Australian Privacy Principle under the <em>Privacy Act 1988</em> (Cth). </li>
<li >To comply with any directions, guidelines, determinations or recommendations referred to in the <strong>Work Order</strong> or made by the Information Commissioner.</li>
<li >To notify the <strong>buyer</strong> immediately if <strong>you</strong> become aware of a breach or possible breach of any of <strong>your</strong> privacy obligations.</li>
</ul>

<p><strong>2.19 Conflict of interest</strong></p>

<p><strong>You</strong> confirm that, to the best of your knowledge and by making reasonable inquiries, <strong>you</strong> do not have a conflict of interest in relation to any aspect of your participation in the Digital Marketplace.</p>

<p>If an actual or potential conflict of interest arises, <strong>you</strong> must notify <strong>us, </strong>and the <strong>buyer</strong> if relevant, and take all steps required to manage the conflict of interest as directed by <strong>us</strong> or the <strong>buyer</strong>. </p>
<p><br /><br /></p>
<p><strong>2.20 Audit and access</strong></p>

<p>You must allow authorised representatives of the buyer access to, and permit copies to be made of, all <strong>material</strong>, records and information relating to the supply of the <strong>services</strong> or <strong>product/s </strong>and assist with any audits as requested by <strong>us</strong> or the<strong> buyer</strong>.</p>
<p><br /><br /></p>
<p><strong>2.21 Alternative dispute resolution</strong></p>

<p>If a dispute arises between <strong>you</strong> and a <strong>buyer</strong>, the following process must be followed before <strong>you </strong>can commence court proceedings:</p>

<ul>
<li ><strong>You</strong> must attempt to settle the dispute by negotiating with the <strong>buyer</strong>. </li>
</ul>

<ul>
<li >If the dispute has not been settled within 10 business days of the negotiations, <strong>you</strong> or the <strong>buyer</strong> may refer the dispute to a mediator who has been agreed on by both <strong>you</strong> and the <strong>buyer</strong>. Alternatively, <strong>you</strong> can refer the dispute to the chairperson of an accredited mediation organisation to appoint a mediator. In either case, mediation must commence within 15 business days of the referral to mediation. <br /><br /></li>
<li >Each party will bear their own costs for dispute resolution. The costs of a mediator will be split evenly between <strong>you</strong> and the <strong>buyer</strong>. <br /><br /></li>
<li >If the dispute is not resolved after mediation, <strong>you</strong> or the <strong>buyer</strong> may seek remedy through the courts.</li>
</ul>

<p><strong>2.22 Termination and suspension</strong></p>

<p><strong>We</strong> may, at any time, by prior written notice, terminate this <strong>agreement</strong> for any reason without any liability to <strong>us</strong>. </p>

<p>If the <strong>agreement</strong> is terminated, <strong>you</strong> will be removed from the Digital Marketplace. </p>

<p>We may, by giving notice, suspend <strong>you </strong>from the Digital Marketplace for a period of time that <strong>we</strong> reasonably consider necessary if:</p>

<ul>
<li >We have received substantiated negative feedback relating to a significant matter from a <strong>buyer</strong>; </li>
<li >We consider that <strong>you</strong> are not providing the <strong>services</strong> in accordance with this <strong>agreement</strong>, the <strong>Digital Marketplace</strong> Terms of Use, or the terms of a <strong>Work Order</strong>. </li>
</ul>
<p><br /><br /></p>
<p>In case of suspension, current <strong>Work Orders</strong> will continue unless terminated by the <strong>buyer</strong>.</p>

<p>Without limiting any other rights or remedies the <strong>buyer</strong> may have, the <strong>buyer</strong> may terminate a <strong>Work Order</strong> effective immediately by giving written notice to <strong>you</strong> if you breach a provision of this <strong>agreement</strong> or a <strong>Work Order</strong> where:<br /><br /></p>
<ul>
<li > the breach is not capable of remedy </li>
<li >or <strong>you</strong> fail to remedy the breach within 14 days of receiving written notice requiring <strong>you</strong> to remedy the breach.</li>
</ul>

<p>The <strong>buyer</strong> may also terminate a <strong>Work Order</strong> for any reason, by giving at least 5 business-days&rsquo; written notice. The <strong>buyer</strong> will only be liable to pay for <strong>services</strong> performed or <strong>products</strong> supplied in the period before the date of termination.</p>

<p>On termination of any <strong>Work Order</strong>, <strong>you</strong> must stop work on the affected<strong> services </strong>&nbsp;from the date of termination and follow any directions given by the <strong>buyer</strong>.</p>

<p><strong>You</strong> may terminate this <strong>agreement</strong> (but not any <strong>Work Orders</strong>) at any time by 30 days' prior written notice to <strong>us</strong>.</p>

<p><strong>2.23 Variation</strong></p>

<p>A <strong>buyer</strong> or <strong>seller</strong> cannot vary the terms of this <strong>agreement</strong>. <strong>You</strong> can propose changes to this <strong>agreement</strong> for <strong>us</strong> to consider by written notice to <strong>us</strong>. &nbsp;</p>

<p><strong>We</strong> may vary this <strong>agreement</strong> by giving <strong>you</strong> at least 20 business days' written notice. &nbsp;<strong>You</strong> may terminate this <strong>agreement</strong> by written notice to <strong>us</strong> before the date when the variation is to come into effect if you do not wish to accept the variation.</p>

<p>The terms for <strong>Work Orders</strong> are those of the <strong>agreement</strong> in place at the time the <strong>Work Order</strong> came into effect. </p>

<p><strong>Work Orders</strong> can only be varied by written agreement between <strong>you</strong> and the <strong>buyer</strong>. </p>

<p><strong>2.24 Waiver</strong></p>
<p>If <strong>you</strong> want to give up a right under this <strong>agreement</strong> and any <strong>Work Order</strong>, the waiver must be set out in a written notice to <strong>us</strong> and the <strong>buyer </strong>detailing the term and extent of the waiver.</p>

<p><strong>2.25 Assignment and novation</strong></p>

<p>You may not assign or novate <strong>your</strong> rights and obligations under this <strong>agreement</strong> without <strong>our</strong> prior written consent and in the case of any <strong>Work Order</strong>, the prior written consent of the <strong>buyer</strong>.</p>

<p><strong>2.26 Survival</strong></p>
<p>The termination or expiry of this <strong>agreement</strong> for any reason will not affect or extinguish the terms which are intended to survive termination or expiry. </p>

<p>The terms intended to survive termination are as follows: </p>
<ul>
<li >Clause 2.7 &ndash; Seller obligations </li>
<li >Clause 2.16&ndash; Intellectual property rights </li>
<li >Clause 2.17 - Confidentiality</li>
<li >Clause 2.18 &ndash; Privacy obligations</li>
<li >Clause 2.20 &ndash; Audit and access </li>
</ul>

<p><strong>2.27 Notices</strong></p>
<p>A notice must be submitted by email and addressed to the recipient's contact person. A contact person can be changed at any time, by giving notice to each other party to this <strong>agreement</strong> and any <strong>Work Order</strong>. </p>
<p><br /><br /></p>
<p><strong>2.28 Jurisdiction</strong></p>

<p>This <strong>agreement</strong> and any <strong>Work Order</strong> is governed by the law of the Australian Capital Territory. Any court proceedings. must be heard in the courts of the ACT.</p>

<ol start="3">
<li><strong> Definitions</strong></li>
</ol>

<p><strong>Agreement</strong> means this Master Agreement.</p>

<p><strong>Active sellers</strong> are members of the Digital Marketplace Panel. </p>

<p><strong>Buyer</strong> means a person, representing an entity, who is registered as a buyer on the Digital Marketplace. </p>

<p><strong>Commencement date </strong>means the date you become an <strong>Active Seller.</strong></p>

<p><strong>Confidential information</strong> means information that:<br /><br /></p>
<ul>
<li >Is designated by a party as confidential</li>
<li >Is described in the <strong>Work Order</strong> as confidential</li>
<li >Is agreed in writing by the parties as confidential</li>
<li >A party knows or ought to know is confidential</li>
</ul>

<p>It does not include information that is, or becomes, public knowledge other than by breach of this <strong>agreement</strong> or a <strong>Work Order </strong>or any other confidentiality obligation.</p>

<p><strong>Delivery </strong>means the provision of the <strong>services</strong> or<strong> product/s</strong> specified in the <strong>Work Order</strong>.</p>

<p><strong>DTA</strong> means the Commonwealth of Australia represented by the Digital Transformation Agency.</p>
<p><strong>Digital Marketplace</strong> means processes or resources made available by the <strong>DTA</strong> to facilitate <strong>buyers</strong> procuring digital <strong>products</strong> and <strong>services</strong>.</p>

<p><strong>Material</strong> means any software, firmware, documented methodology or process, documentation or other material in whatever form, including without limitation any reports, specifications, business rules or requirements, user manuals, user guides, operations manuals, training materials and instructions, and the subject matter of any category of intellectual property rights.</p>
<p><br /><br /></p>
<p><strong>Order material</strong> means any <strong>material</strong> created by <strong>you</strong> as a result of performing its obligations under a <strong>Work Order</strong>, including any modifications.</p>

<p><strong>Our</strong>, <strong>us</strong> and <strong>we</strong> means the Commonwealth of Australia represented by the Digital Transformation Agency.</p>
<p><strong>Personnel</strong> means, in relation to a party, any natural persons who are employees, officers, agents, contractors, subcontractors or professional advisers of that party.</p>

<p><strong>Product </strong>or<strong> products </strong>means any item or items to be delivered or provided under a Work Order by <strong>you</strong> to a <strong>buyer</strong>, and may include, but is not limited to, software and digital products. </p>

<p><strong>Registered sellers </strong>are not Digital Marketplace Panel members but have a profile, visible to buyers on the Digital Marketplace and can view opportunities. They cannot apply for opportunities but can apply to become an <strong>active seller</strong>. </p>

<p><strong>Area of expertise </strong>means a defined set of skills, knowledge and experience.</p>

<p><strong>Seller</strong> means a business who offers their products or services on the Digital Marketplace.</p>
<p><strong>Services</strong> means the work to be performed as described in the <strong>Work Order</strong>.</p>

<p><strong>Software</strong> means the programs, programming languages, and data that direct the operations of a computer system.<br /><br /></p>
<p><strong>Work Order </strong>means a contract formed between a <strong>buyer</strong> and a <strong>seller</strong> under this <strong>agreement </strong>for the provision of <strong>services</strong> and/or <strong>product/s</strong>. </p>

<p><strong>You</strong> means the party specified as the <strong>seller</strong> in this <strong>agreement</strong> and includes <strong>your personnel</strong>.</p>
<p><br /><br /></p>
</div><br/>
                <form>
                    <fieldset>
                <input type="checkbox" id="agree"/><label htmlFor="agree">I accept the master agreement</label>
                    </fieldset>
                </form>
            </div>
        )
    }
    else {
        message = (
            <div>
                <p>You are not the authorised representative of <strong>{name}</strong></p>
                <p>A link will be sent to <strong>{email}</strong> to authorise these changes.</p>
            </div>
        )
    }
    return (
        <div>
            <h1 tabIndex="-1">Accept Master Agreement</h1>
            { message }
            <form action={action} method="post">
                <input type="hidden" name="csrf_token" id="csrf_token" value={csrfToken}/>
                {applicationValid 
                    ? <button type="submit">{buttonText}</button>
                    : <button disabled="disabled">{buttonText}</button>
                }
            </form>
        </div>
    )
}

Submit.defaultProps = {
    onClick: () => {},
    submitUrl: '#',
    authoriseUrl: '#',
}

Submit.propTypes = {
    submitUrl: React.PropTypes.string,
    authoriseUrl: React.PropTypes.string,
    onClick: React.PropTypes.func,
    applicationValid: React.PropTypes.bool,
    name: React.PropTypes.string,
    email: React.PropTypes.string,
    userEmail: React.PropTypes.string,
    csrfToken: React.PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
    return {
        submitUrl: state.form_options.submit_url,
        authoriseUrl: state.form_options.authorise_url,
        applicationValid: ownProps.applicationValid,
        name: ownProps.name,
        email: ownProps.email,
        userEmail: state.form_options.user_email,
        csrfToken: state.form_options.csrf_token
    }
}

export {
    mapStateToProps
}

export default connect(mapStateToProps)(Submit);