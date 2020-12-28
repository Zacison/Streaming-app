import React from 'react';
import StreamForm from './StreamForm';
import { connect } from 'react-redux';
import { createStream } from '../../redux/actions/index';

class StreamCreate extends React.Component {
    onSubmit = (formValues) => {
        console.log(formValues);
        this.props.createStream(formValues);
    };

    render() {
        return (
            <div>
                <h3>Create a stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createStream: (formValues) => dispatch(createStream(formValues)),
    };
};

export default connect(null, mapDispatchToProps)(StreamCreate);
