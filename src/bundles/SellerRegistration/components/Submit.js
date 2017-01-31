import React from 'react';
import {connect} from 'react-redux';

const Submit = ({submitUrl, applicationValid, onClick, name, userEmail, authoriseUrl, email, csrfToken}) => {
    let message;
    const userIsAuthorised = userEmail === email;
    const buttonText = userIsAuthorised ? 'Submit my application' : 'Send email to representative';
    const action = userIsAuthorised ? submitUrl : authoriseUrl;
    if (userIsAuthorised) {
        message = (
            <div>
                <p>I am the authorised representative of <strong>{name}</strong></p>
                <a href="#">Download Master Agreement</a><br/><br/>
                <textarea style={{"width":"100%", "overflow-y": "scroll",
    "min-height": "300px",
    resize: "none"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi faucibus porttitor egestas. Cras luctus nulla nec orci blandit, et cursus augue tincidunt. Nullam lacus mauris, convallis eu pretium dignissim, condimentum et lectus. Fusce et ipsum odio. Phasellus at massa vel tortor euismod maximus. In luctus mauris ante, eget maximus diam ornare id. Nunc elit ipsum, tincidunt lobortis dignissim vel, mollis eget metus. Vestibulum egestas quam vitae semper aliquet. Proin feugiat porta est, ut tristique ligula rhoncus sit amet. Ut nisl turpis, lacinia vitae gravida et, euismod sed dolor. Quisque mauris mauris, gravida eget nibh ut, mattis auctor diam. Nam et nulla vel orci consequat eleifend. Morbi commodo neque sed molestie feugiat. Morbi lacinia magna at est pretium cursus. Sed pellentesque sapien sit amet nisi semper vehicula.

                Ut volutpat risus lacinia est fermentum, quis ullamcorper justo sodales. Quisque tincidunt gravida metus. Ut finibus lectus at elit accumsan maximus. Vivamus quam augue, porta ultricies magna at, aliquet feugiat nisl. Phasellus suscipit nunc non sapien bibendum, vitae vehicula sem hendrerit. Maecenas ex metus, lacinia ut malesuada eget, facilisis eu mi. Aenean at vehicula diam. Donec condimentum dictum tellus et rutrum. Curabitur quis ante turpis. Donec lacinia dapibus lobortis. Suspendisse arcu augue, ultrices et tellus eget, ultrices blandit ex. Praesent erat eros, mattis in porttitor sed, gravida eu tellus. Donec justo nisi, condimentum et condimentum quis, volutpat sed augue. Pellentesque ac arcu porttitor, condimentum felis non, elementum odio. Donec maximus turpis libero, ut accumsan lorem venenatis in. Phasellus sed ullamcorper mi.

                Cras odio nisl, mattis et cursus quis, mollis in libero. Suspendisse accumsan convallis fringilla. Nulla tristique tempor enim. Phasellus sit amet mattis libero. Suspendisse ac magna quis nunc maximus rhoncus. Integer condimentum nunc dui, ut laoreet neque commodo quis. Morbi imperdiet ligula a neque elementum, tristique pretium erat ornare. Quisque dapibus volutpat nibh a volutpat.

                Cras ut condimentum erat. Donec mi purus, tempor et scelerisque ut, vestibulum non justo. Phasellus scelerisque arcu sed tincidunt ultrices. Curabitur eget scelerisque mi, eu malesuada leo. Nam ornare imperdiet elit, ultricies tincidunt risus blandit et. Suspendisse eu elementum nibh. Sed faucibus, ex ut condimentum tempor, nibh enim egestas mauris, vitae ullamcorper nisl lectus eu tellus. Maecenas efficitur faucibus semper. Pellentesque in lobortis ex. Nunc convallis tincidunt laoreet. Sed ullamcorper, quam vel dictum malesuada, leo nibh rhoncus metus, a auctor nibh tortor lobortis tortor. Fusce pulvinar varius lacus quis faucibus. Vestibulum condimentum vehicula nisi, porta varius urna tristique vitae. Nullam in aliquet diam. Etiam eget elementum nibh.

                Nunc ac fringilla dui. Quisque mi ex, pharetra at pellentesque vitae, euismod non orci. Ut et fringilla ex. Curabitur ac risus in urna porta porta. Sed gravida eget turpis ut finibus. Phasellus ut tortor vitae tellus suscipit feugiat. Vestibulum ut vulputate urna. Nullam imperdiet urna vitae dui rhoncus hendrerit. Pellentesque sollicitudin gravida lacus, eu scelerisque massa. Mauris pharetra vehicula scelerisque. Sed consectetur, lectus ut fermentum ultricies, mi nisl finibus diam, sed facilisis turpis metus vel ex. Curabitur scelerisque faucibus urna in sodales. Nullam pharetra eu turpis quis convallis.
                </textarea><br/>
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