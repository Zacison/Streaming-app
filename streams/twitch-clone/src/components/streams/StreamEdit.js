import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../redux/actions/index';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    };

    render() {
        console.log(this.props);
        if (!this.props.stream) {
            return <div>...Loading</div>;
        }
        return (
            <div>
                <h3>Edit a stream</h3>
                <StreamForm
                    initialValues={{
                        title: this.props.stream.title,
                        description: this.props.stream.description,
                    }}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchStream: (id) => dispatch(fetchStream(id)),
        editStream: (id, formValues) => dispatch(editStream(id, formValues)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamEdit);
