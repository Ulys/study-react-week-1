let Card = React.createClass( {

      getInitialState: () => {
        return {};
      },

      componentDidMount: function() {
        $.get( "https://api.github.com/users/" + this.props.login, data => {
            this.setState( data );
        } );
      },

      render: function () {

        return (
          <div>
            <img src={this.state.avatar_url} width="80"/>
            <h3>{this.state.name}</h3>
            <hr/>
          </div>
      );
      }
    } ),
    Form = React.createClass( {

      handleSubmit: function( e ) {
        e.preventDefault();

        var loginInput = ReactDOM.findDOMNode( this.refs.login );
        this.props.addCard( loginInput.value );
        loginInput.value = "";
      },

      render: function() {

        return (
          <form onSubmit={this.handleSubmit}>
            <input placeholder="github login" ref="login"/>
            <button>Add</button>
          </form>
          )
      }
    } ),
    Main = React.createClass( {

          getInitialState: function() {
            return {
              logins: []
            };
          },

          addCard: function( newLogin ) {
            this.setState( {
              logins: this.state.logins.concat( newLogin )
            } );
          },

          render: function () {
            var cards = this.state.logins.map( (login) => (<Card login={login}/>) );
            return (
                <div>
                  {cards}
                  <Form addCard={this.addCard}/>
                </div>
            );
          }
        } );

ReactDOM.render( <Main />, document.querySelector( '#root' ) );
