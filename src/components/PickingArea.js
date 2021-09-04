import React, {Component} from 'react';
import _ from 'lodash';
import { getDatabase, ref, onValue } from 'firebase/database';

class PickingArea extends Component {

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      name: '',
      players: [],
      showWarning: false,
      showBuddy: false,
      secretBuddy: '',
    };

    var database = getDatabase(this.props.app);
    var starCountRef = ref(database, 'players');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.setState({
        players: data
      });
    });

  }

  onChange(evt) {
    this.setState({
      name: evt.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let players = this.state.players;
    let enterName = this.state.name;
    this.setState({
      showWarning: !(players.some(p => (p.name === enterName && p.isGotBuddy == false) ))
    }, () => {
      //create list of tickets (filter the player out)
      if(!this.state.showWarning) {
        var tickets = players.filter(p => (p.name != enterName) );
        tickets = tickets.filter(p => (p.isPicked == false));
        let secretNumber = Math.floor(Math.random()* tickets.length);
        this.setState({
          showBuddy: true,
          secretBuddy: tickets[secretNumber].name
        });
      }
    });
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
                  to avoid pick up yourself
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
              {this.state.showWarning && <NotAllowedWarning />}
              {this.state.showBuddy && <AnounceBuddy buddy={this.state.secretBuddy} />}
            </div>
          </div>
      </div>
    )

  }

}
const NotAllowedWarning = () => (
  <div class="box" >
    <p class="has-text-danger is-size-3">*** You are not allowed ***</p>
  </div>
)

const AnounceBuddy = ({buddy}) => (
  <div class="box" >
    <p>Your Secret Buddy is ...</p>
    <p class="is-size-3 has-background-primary-light has-text-primary">{buddy}</p>
  </div>
)
export default PickingArea