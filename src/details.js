import React from 'react';
import Pet from '@frontendmasters/pet';

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }
  omponentDidMount() {
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city} , ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.brees.primary,
        loading: false,
      });
    });
  }
  render() {
    return;
  }
}

export default Details;
