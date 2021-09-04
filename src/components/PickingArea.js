import React, {Component} from 'react';
import _ from 'lodash';

class PickingArea extends Component {

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    // this.onKeyup = this.onKeyup.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      name: '',
      players: []
    };

    let app = this.props.db.database().ref('players');
    app.on('value', snapshot => {
      this.getData(snapshot.val());
    });

  }

  getData(values){
    let messagesVal = values;
    let messages = _(messagesVal)
                    .keys()
                    .map(messageKey => {
                      let cloned = _.clone(messagesVal[messageKey]);
                      cloned.key = messageKey;
                      return cloned;
                    }).value();
    this.setState({
      players: messages
    });
    console.log("Players: " + this.state.players);
  }

  onChange(evt) {
    this.setState({
      name: evt.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.name);
  }

  render() {

    return (
        <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-6 is-offset-3">
              <h1 class="title">
                  Enter your name
              </h1>
              <h2 class="subtitle">
                  *** to avoid picking yourself ***
              </h2>
              <div class="box">
                <form>
                  <div class="field is-grouped">
                    <p class="control is-expanded">
                      <input class="input" type="text" name="name" value={this.state.name} onChange={this.onChange}/>
                    </p>
                    <p>
                      <input class="button is-info" type="submit" value="Pick" onClick={this.onSubmit} />
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
    )

  }

}
export default PickingArea