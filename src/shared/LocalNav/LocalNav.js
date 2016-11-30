import React from 'react';

class LocalNav extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      open: false
    }
  }

  toggle(e) {
    e.preventDefault()
    this.setState({ open: !this.state.open })
  }

  render() {
    const { children, className, navClassName, id } = this.props;
    const { open } = this.state;
    return (
      <aside className={className} id={id}>
        <button aria-controls="local-nav" className="local-nav-toggle" aria-expanded={open} onClick={this.toggle}>
          Menu
        </button>
        <nav className={`local-nav ${navClassName}`} aria-label="main navigation" aria-expanded={open} open={open}>
          <ul>
            {children}
          </ul>
        </nav>
      </aside>
    );
  }
}

export default LocalNav;