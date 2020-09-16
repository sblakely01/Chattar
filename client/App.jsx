import React from 'react';
import axios from 'axios';
import messageObj from './messageObj.jsx';

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      messageFiles: {},
      message: '',
      latitude: 0,
      longitude: 0,
      sender: '',
      errors: {
        message: '',
        latitude: '',
        longitude: '',
        sender: ''
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  componentDidMount() {
     axios.get('https://raw.githubusercontent.com/sblakely01/sblakely01.github.io/dev/database/messages.json')
     .then((response) => {
      //  this.getMessages(result);
       console.log(response);
       this.setState({messageFiles: response.data});

      for (var keys in response.data)
      {
        let gps = document.createAttribute('gps-entity-place');
        let size = document.createAttribute('scale');
        let words = document.createAttribute('text');
        var sceneEl = document.querySelector('a-scene');
        let rand = Math.random() * .000001;
        let latitude = response.data[keys].lat + rand;
        rand = Math.random() * .000001;
        let longitude = response.data[keys].lng + rand;
          var entityEl = document.createElement('a-text');

          // console.log('gps-entity-place', 'latitude: ' + latitude + '; longitude: ' + longitude + ';');
          entityEl.setAttribute('value', response.data[keys].message);
          // entityEl.setAttribute('scale', {x: 2, y: 2, z: 2 });
          entityEl.setAttribute('look-at', '[gps-camera]');
          console.log(response.data[keys].message);
          // entityEl.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
          entityEl.setAttribute('gps-entity-place', `latitude: ${38.0958419}; longitude: ${-85.6927302};`);
          gps.value = `latitude: ${latitude}; longitude: ${longitude};`;
          words.value = response.data[keys].message;
          size.value = '2 2 2';
          entityEl.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
            console.log('Place Loaded');
          });
          entityEl.setAttributeNode(gps);
          entityEl.setAttributeNode(size);
          sceneEl.appendChild(entityEl);
      }
    })
    .catch((err) => {console.log(err)});
  }

  handleInputChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'message':
        errors.message =
        (value.length < 1 || value.length > 15) ? 'Message must be between 1 and 15 characters' : '';
        break;
      case 'latitude':
        errors.latitude =
        (value.length < 5) ? 'Latitude must be at least 5 digits': '';
        break;
      case 'longitude':
        errors.longitude =
        (value.length < 5) ? 'Longitude must be at least 5 digits': '';
        break;
      case 'sender':
        errors.sender =
        (value.length > 15) ? 'Sender name is too long' : '' ;
        break;
      default:
        break;
    }
    this.setState({errors, [name]: value}, () => {
      console.log(name);
    })
  }

  // getMessages(location) {
  //   console.log(location.data);
  //   let lat = location.data.latitude;
  //   let lon = location.data.longitude;
  //   axios.get('/getmessages/' + lat + '/' + lon)
  //   .then((results) => { this.setState({messages: results.data})})
  //   .catch((err) => {console.error(err)})
  // };
  submitHandler(event) {
    event.preventDefault();
    if (validateForm(this.state.errors)) {
      console.info('Valid Form');
      data = {
        message: this.state.message,
        lat: this.state.latitude,
        lng: this.state.longitude,
        sender: this.state.sender
      }
      const myHeaders = new Headers({
        "Content-Type": "Application/json",
        dataType: "jsonp",
        Accept: "application/json"
      })
      axios.post('https://sblakely01.github.io/dev/database/messages.json', data, {
        headers: myHeaders,
      })
      .then((res) => {
        console.log(res);
      })
    } else {
      console.error('Invalid Form')
    }

  }

  render() {
    const {errors} = this.state;
    return (
      <div style={{position: "fixed", top: "10px", width: "100%", textAlign: "center", zIndex: "100", justifyContent: "center", left: "15px"}}>
        {document.getElements}
        <form onSubmit={this.submitHandler}>
          <label>
            Message:
            <input type="text" name="message" value={this.state.message} onChange={this.handleInputChange} />
          </label>
          {errors.message.length > 0 &&
            <span className='error'>{errors.message}</span>}
          <p></p>
          Send to:
          <p></p>
          <label>
          Latitude:
          <input type="number" name="latitude" value={this.state.latitude} onChange={this.handleInputChange} />
          </label>
          {errors.latitude.length > 0 &&
          <span className='error'>{errors.latitude}</span>}
          <label>
            Longitude:
            <input type="number" name="longitude" value={this.state.longitude} onChange={this.handleInputChange} />
          </label>
          {errors.longitude.length > 0 &&
          <span className='error'>{errors.longitude}</span>}
          <label>
            Sender:
            <input type="text" name="Sender"  value={this.state.sender} onChange={this.handleInputChange}/>
          </label>
          {errors.sender.length > 0 &&
          <span className='error'>{errors.sender}</span>}
          <input type="submit" value="Submit" />
        </form>
      </div>

    )

  }
}

export default App;