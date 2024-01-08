import React from 'react';

export function withAuth(ComponentToProtect) {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true,
      };
    }

    componentDidMount() {
      fetch('/checkToken')
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }

    render() {
      const { loading } = this.state;
      if (loading) {
        return null;
      }
      return <ComponentToProtect {...this.props} />;
    }
  }
}