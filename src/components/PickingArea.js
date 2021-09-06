import React, {Component} from 'react';
import live from '../assets/flow.gif';
import { getDatabase, ref, onValue, update } from 'firebase/database';

class PickingArea extends Component {

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.pickBuddy = this.pickBuddy.bind(this);
    this.state = {
      name: '',
      players: [],
      showWarning: false,
      showBuddy: false,
      secretBuddy: '',
      playersGotBuddy: [],
      outOfTickets: false,
    };

    let database = getDatabase(this.props.app);
    let starCountRef = ref(database, 'players');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      var playersGotBuddyList = [];
      if(data && data.length > 1) {
        playersGotBuddyList = data.filter(p => (p.isGotBuddy === true));
        playersGotBuddyList = playersGotBuddyList.map(p => p.name);
        this.setState({outOfTickets: false});
      } else {
        this.setState({outOfTickets: true});
      }
      
      this.setState({
        players: data,
        playersGotBuddy: playersGotBuddyList
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
    var players = this.state.players;
    var enterName = this.state.name;
    var notAllowed = !(players.some(p => (p.name === enterName && p.isGotBuddy === false) ))
    this.setState({
      showWarning: notAllowed,
      showBuddy: !notAllowed
    }, () => {
      //create list of tickets (filter the player out)
      if(!notAllowed && players.length > 1) {
        this.pickBuddy(players, enterName);
        this.setState({outOfTickets: false});
      }
    });
  }

  pickBuddy(players, enterName) {
    var tickets = players.filter(p => (p.name !== enterName) );
    tickets = tickets.filter(p => (p.isPicked === false));
    let secretNumber = Math.floor(Math.random()* tickets.length);
    let secretBuddy = tickets[secretNumber].name;
    
    let playerIndex = players.findIndex(p => p.name === enterName);
    let buddyIndex = players.findIndex(p => p.name === secretBuddy);

    if(!players[buddyIndex].isPicked && !players[players.isGotBuddy]) {
      let database = getDatabase(this.props.app);
      update(ref(database, 'players/' + buddyIndex), {
        isPicked: true
      });
      update(ref(database, 'players/' + playerIndex), {
        isGotBuddy: true,
        buddy: secretBuddy
      });
      this.setState({
        showBuddy: true,
        secretBuddy: secretBuddy
      });
    } else {
      this.setState({
        showWarning: true,
        showBuddy: false
      });
    }
    
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
              {(this.state.outOfTickets) && <OutOfTickets />}
              {(this.state.playersGotBuddy.length > 0) && <WhoGotBuddy buddy={this.state.playersGotBuddy} />}
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
    <p class="has-text-danger">You are not allowed or already got your buddy.</p>
  </div>
)

const OutOfTickets = () => (
  <div class="box" >
    <p class="has-text-danger">[Out of Tickets] Everybody got their buddy.</p>
  </div>
)

const AnounceBuddy = ({buddy}) => (
  <div class="box" >
    <p>Your Secret Buddy is ...</p>
    <p class="is-size-3 has-background-primary-light has-text-primary">{buddy}</p>
  </div>
)

const WhoGotBuddy = ({buddy}) => (
  <div>
    <div class="columns is-mobile is-vcentered">
      <div class="column">
        <img width="100" src={live} alt="live" />
      </div>
      <div class="column is-four-fifths">
        <p class="has-text-info has-text-left is-italic">{buddy.join(', ')} already got buddy.</p>
        
      </div>
    </div>
  </div>
)

export default PickingArea