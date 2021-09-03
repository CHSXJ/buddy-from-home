import React, {Component} from 'react';
class PickingArea extends Component {
  render(){
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
                      <input class="input" type="text" name="name" />
                    </p>
                    <p>
                      <input class="button is-info" type="submit" value="Pick" />
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