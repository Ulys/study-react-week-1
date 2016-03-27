
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
          React.createElement("div", null, 
            React.createElement("img", {src: this.state.avatar_url, width: "80"}), 
            React.createElement("h3", null, this.state.name), 
            React.createElement("hr", null)
          )
      );
      }
    } ),
    Form = React.createClass( {displayName: "Form",

      handleSubmit: function( e ) {
        e.preventDefault();

        var loginInput = ReactDOM.findDOMNode( this.refs.login );
        this.props.addCard( loginInput.value );
        loginInput.value = "";
      },

      render: function() {

        return (
          React.createElement("form", {onSubmit: this.handleSubmit}, 
            React.createElement("input", {placeholder: "github login", ref: "login"}), 
            React.createElement("button", null, "Add")
          )
          )
      }
    } ),
    Main = React.createClass( {displayName: "Main",

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
            var cards = this.state.logins.map( (login) => (React.createElement(Card, {login: login})) );
            return (
                React.createElement("div", null, 
                  cards, 
                  React.createElement(Form, {addCard: this.addCard})
                )
            );
          }
        } );

ReactDOM.render( React.createElement(Main, null), document.querySelector( '#root' ) );