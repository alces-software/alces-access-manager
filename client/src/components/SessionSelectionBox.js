
import React from 'react';
import {Button, OverlayTrigger, Popover} from 'react-bootstrap';
import FlipCard from 'react-flipcard';
import {Link} from 'react-router';

import ButtonContent from 'components/ButtonContent';
import Icon from 'components/Icon';
import PasswordRevealer from 'components/PasswordRevealer';
import {selectionBoxPropTypes} from 'utils/propTypes';

class SessionSelectionBox extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isFlipped: false,
    }
  }

  render() {
    const session = this.props.item;
    const {cluster} = this.props;

    const sessionLink = `/cluster/${cluster.ip}/session/${session.uuid}`

    // TODO: 1st external access URL has user root in the details.txt file
    // because $USER is still always set to root even if we're acting as
    // another user - does this matter?

    const vncHyperlinkAccess =
      `vnc://${cluster.authenticated_username}:${session.password}@${session.access_host}:${session.port}`;
    const vncPortNumberAccess = `${session.access_host}:${session.port}`;
    const vncDisplayNumberAccess = `${session.access_host}:${session.display}`;

    const vncHyperlinkAccessPopover = (
      <Popover
        title={<span>External VNC access via a <strong>hyperlink</strong></span>}
        id="hyperlink-access-popover"
      >
        Supported by browsers and operating systems that have been configured
        to accept <code>vnc://</code> hyperlinks such as:
        <ul>
          <li>
            OS X using <em>OS X Screen Sharing</em>.
          </li>
          <li>
            Windows by configuring a protocol handler in the registry.
          </li>
          <li>
            Linux by configuring a protocol handler using xdg-mime.
          </li>
        </ul>
      </Popover>
    );

    const vncPortNumberAccessPopover = (
      <Popover
        title={<span>External VNC access via <strong>port</strong> number</span>}
        id="port-number-access-popover"
      >
        Supported by VNC clients that accept a port number such as:
        <ul>
          <li>
            <a href="http://www.tigervnc.org" target="_blank">
              TigerVNC</a> (Linux, OS X, Windows).
          </li>
          <li>
            <a href="http://www.tightvnc.com/" target="_blank">
              TightVNC</a> (Linux, Windows).
          </li>
          <li>
            <a href="http://www.turbovnc.org/" target="_blank">
              TurboVNC</a> (Linux, OS X, Windows).
          </li>
        </ul>
      </Popover>
    );

    const vncDisplayNumberAccessPopover = (
      <Popover
        title={<span>External VNC access via <strong>display</strong> number</span>}
        id="display-number-access-popover"
      >
        Supported by VNC clients that accept a VNC display number such as:
        <ul>
          <li>
            <a href="https://www.realvnc.com/" target="_blank">
              RealVNC</a> (Linux, OS X, Windows).
          </li>
          <li>
            <a href="http://www.uvnc.com/" target="_blank">
              UltraVNC</a> (Windows only).
          </li>
        </ul>
      </Popover>
    );

    return (
      <div className="flip-selection-box">
        <FlipCard
          disabled={true}
          flipped={this.state.isFlipped}
        >
          <div>
            <p>
              <strong>{session.type}</strong> session running
              on <strong>{session.hostname}</strong>
            </p>
            <p>
              Display: {session.display}
            </p>
            <p>
              Websocket port: {session.websocket}
            </p>
              <Link to={sessionLink}>
                <Button
                  className="selection-box-button"
                  type="button"
                  bsStyle="success"
                >
                  <ButtonContent
                    text="Connect In Browser"
                    iconName="session-connect"
                  />
                </Button>
              </Link>
              <Button
                className="selection-box-button"
                type="button"
                bsStyle="info"
                onClick={this.handleClickExternalAccessButton.bind(this)}
              >
                <ButtonContent
                  text="External Access"
                  iconName="session-external-access"
                />
              </Button>
          </div>

          <div className="external-access-details">
            <p>
              <strong>Select an appropriate method for external access to your
                VNC session:</strong>
            </p>

            <p className="external-access-section">
              Via a <strong>hyperlink</strong>: <a
                href={vncHyperlinkAccess}>
                <code>{this.obfuscateVncUri(vncHyperlinkAccess)}</code>
              </a>
              &nbsp;<OverlayTrigger
                overlay={vncHyperlinkAccessPopover}
                placement="right"
                rootClose
                trigger="click"
              >
                <Icon name="session-external-access-info"/>
              </OverlayTrigger>
            </p>

            <p className="external-access-section">
              Via <strong>port</strong> number: <code>
                {vncPortNumberAccess}</code>
              &nbsp;<OverlayTrigger
                overlay={vncPortNumberAccessPopover}
                placement="right"
                rootClose
                trigger="click"
              >
                <Icon name="session-external-access-info"/>
              </OverlayTrigger>
            </p>

            <p className="external-access-section">
              Via <strong>display</strong> number: <code>
                {vncDisplayNumberAccess}</code>
              &nbsp;<OverlayTrigger
                overlay={vncDisplayNumberAccessPopover}
                placement="right"
                rootClose
                trigger="click"
              >
                <Icon name="session-external-access-info"/>
              </OverlayTrigger>
            </p>

            <p className="external-access-section">
              The password to access your VNC session using any of these
              methods is available below:
            </p>
            <PasswordRevealer password={session.password}/>

            <Button
              className="selection-box-button"
              type="button"
              bsStyle="info"
              onClick={this.handleClickBackButton.bind(this)}
            >
              <ButtonContent
                text="Back"
                iconName="session-external-access-back"
              />
            </Button>
          </div>
        </FlipCard>
      </div>
    );
  }

  handleClickExternalAccessButton() {
    this.setState({
      isFlipped: true,
    });
  }

  handleClickBackButton() {
    this.setState({
      isFlipped: false,
    })
  }

  obfuscateVncUri(uri) {
    // Adapted from equivalent hack in Portal.
    const brokenParse = new URL(uri)
    const hackedParse = new URL(`http:${brokenParse.pathname}`)
    hackedParse.password = "******"
    hackedParse.protocol = brokenParse.protocol
    return hackedParse.href
  }
}

SessionSelectionBox.propTypes = selectionBoxPropTypes;

export default SessionSelectionBox;
