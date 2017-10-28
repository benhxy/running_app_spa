import React from 'react';
import Formsy from 'formsy-react';

const MyOwnInput = React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue(event) {
    this.setValue(event.currentTarget[(this.props.type === 'checkbox') ? 'checked' : 'value']);
  },

  render() {

    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    const className = 'form-group ' + (this.props.className || ' ') +
      (this.showRequired() ? ' required' : this.showError() ? ' error' : '') + (this.props.type == 'checkbox' ? 'check-box-group': '');

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
        <label className={this.props.labelCls || 'form-input-label'} htmlFor={this.props.id || this.props.name }>{this.props.title}<span className="form-required">{this.isRequired() ? '*' : ''}</span></label>
        <input
          type={this.props.type || 'text'}
          id={this.props.id || this.props.name}
          name={this.props.name}
          onChange={this.changeValue}
          value={this.getValue()}
          checked={(this.props.type === 'checkbox') && this.getValue() ? 'checked' : null}
          className={this.props.cls}
          required={this.showRequired()}
          placeholder={this.props.placeholder}
        />
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

export default MyOwnInput;
