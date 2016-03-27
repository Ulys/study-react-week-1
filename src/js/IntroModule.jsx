let Button = React.createClass( {

      localHandleClick: function () {
        this.props.localHandleClick( this.props.increment );
      },

      render: function() {
        return (
            <button onClick={this.localHandleClick}>+{this.props.increment}</button>
          );
      }
    } ),
    Result = React.createClass( {

      render: function() {
        return (
          <div>{this.props.localCounter}</div>
         );
      }
    } ),
    Main = React.createClass( {

      getInitialState: () => {
        return {
          counter: 0
        }
      },

      handleClick: function( increment ) {
        this.setState( {
          counter: this.state.counter + increment
        } );
      },

      render: function() {
        return (
          <div>
            <Button localHandleClick={this.handleClick} increment={1}/>
            <Button localHandleClick={this.handleClick} increment={5}/>
            <Button localHandleClick={this.handleClick} increment={10}/>
            <Button localHandleClick={this.handleClick} increment={100}/>
            <Result localCounter={this.state.counter}/>
          </div>
        )
      }
    } );

ReactDOM.render( <Main />, document.querySelector( '#root' ) );
