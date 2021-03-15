import React from "react";
import reactCSS from "reactcss";
import { BlockPicker } from "react-color";
import { Badge } from "reactstrap";

class ColorPickerCustom extends React.Component {
  componentDidMount() {
    this.setState({ color: JSON.parse(this.props.color) });
  }

  state = {
    displayColorPicker: false,
    color: {
      r: "241",
      g: "112",
      b: "19",
      a: "1",
    },
    colorHex: "",
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb, colorHex: color.hex });
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
        },
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer",
        },
        popover: {
          position: "absolute",
          zIndex: "2",
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
      },
    });

    return (
      <div>
        <Badge
          pill
          style={styles.color}
          onClick={this.handleClick}
          className="badge-sd"
        >
          <span>{this.props.text}</span>
          <input
            type="hidden"
            value={JSON.stringify(this.state.color)}
            name={this.props.colorFormName}
          ></input>
        </Badge>

        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <BlockPicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ColorPickerCustom;
