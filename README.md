# damgate

Damming up and releasing out flowing events with some conditional patterns.

```js
// Pass through 2 events per second
var dam = new FirstDamGate( /*fps=*/2 )

$(window).scroll(function(){
  dam.execute(function(){
    console.log("Dammed scroll!!")
  })
})
```

# FirstDamGate

This dam is useful for simple event filtering.  
Pass through the first event and then the dam is closed.  
After an interval dam is opened again.  

# LastDamGate

This dam passes through the last event unless the no event is arrived within the interval.  
This is useful for a case like firing text search api on form change events.  
Here is the reactjs example.  

```js
var dam = new LastDamGate( /*fps=*/0.6 )
var KeywordInput = React.createClass({
  getInitialState: function(){
    return { text: "" }
  },
  handleChange: function(event) {
    this.setState({ text: event.target.value })
    dam.execute(function(){
      search(event.target.value)
    })
  }
  render: function() {
    return (
      <input className="keyword" 
        id="search_keywords" 
        name="search[keywords]" 
        type="text"
        onChange={this.handleChange} />
    )
  }
})
```
