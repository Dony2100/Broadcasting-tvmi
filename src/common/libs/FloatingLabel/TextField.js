'use strict';
import React, {Component} from "react";
import {View, TextInput, StyleSheet, Image} from "react-native";
import StyleMethods from '../../Style_Methods';
//import Style from '../../global/style';
import Underline from './Underline';
import FloatingLabel from './FloatingLabel';
import PropTypes from 'prop-types';

//import Icon from 'react-native-fa-icons';
//import Icon from 'react-native-vector-icons/FontAwesome';
export default class TextField extends Component {
  constructor(props: Object, context: Object) {
    super(props, context);
    this.state = {
      textColor:this.props.fieldColor,
      //IconColor:this.props.fieldColor,
      isFocused: false,
      text: (props.value === undefined || props.value === null) ? "" : props.value,
      height: props.height
    };
  }

  MarkField(){
    this.refs.underline.MarkField();
    this.setState({
      textColor:'red',
    //  IconColor:'red',
    });
    //this.refs.floatingLabel.MarkField();
  }

  UnMarkFieild(){
    this.refs.underline.UnMarkFieild();
    //this.refs.floatingLabel.UnMarkFieild();
  }

  focus() {
    this.refs.input.focus();
  }
  blur() {
    this.refs.input.blur();
  }
  isFocused() {
    return this.state.isFocused;
  }
  measureLayout(...args){
    this.refs.wrapper.measureLayout(...args)
  }
  componentWillReceiveProps(nextProps: Object){
    if(this.props.text !== nextProps.value){
      (nextProps.value !== null || nextProps.value !== undefined || nextProps.value.length !== 0) /*?
        this.refs.floatingLabel.floatLabel()
        : this.refs.floatingLabel.sinkLabel();*/
      this.setState({text: nextProps.value});
    }
    if(this.props.height !== nextProps.height){
      this.setState({height: nextProps.height});
    }
  }
  render() {
    let {
    //  icon,
      secureTextEntry,
      label,
      highlightColor,
      duration,
      labelColor,
      borderColor,
      textColor,
      textFocusColor,
      textBlurColor,
      onFocus,
      onBlur,
      onChangeText,
      onChange,
      value,
      dense,
      inputStyle,
      wrapperStyle,
      labelStyle,
      height,
      autoGrow,
      multiline,
      keyboardType,
      autoCapitalize,
      ...props
    } = this.props;
    return (
      <View style={[dense ? styles.denseWrapper : styles.wrapper, this.state.height ? {height: undefined}: {}, wrapperStyle]} ref="wrapper">
        <View style={{flexDirection:'row',flex:1}} >
      {/*}  <Icon name={this.props.icon} style={[styles.icon,{color:this.state.IconColor}]} />*/}
        <TextInput secureTextEntry={secureTextEntry}
          style={[dense ? styles.denseTextInput : styles.textInput, {
            color: textColor , flex:1
          }, (this.state.isFocused && textFocusColor) ? {
            color: textFocusColor
          } : {}, (!this.state.isFocused && textBlurColor) ? {
            color: textBlurColor
          } : {}, inputStyle,  this.state.height ? {height: this.state.height} : {}]}
          multiline={multiline} keyboardType={keyboardType} autoCapitalize={autoCapitalize}
          placeholderTextColor={this.state.textColor}
          onFocus={() => {
            this.setState({isFocused: true});
            //this.refs.floatingLabel.floatLabel();
            this.refs.underline.expandLine();
            onFocus && onFocus();
          }}
          onBlur={() => {
            this.setState({isFocused: false});
             (this.state.text !== null && !this.state.text.length) /*&& this.refs.floatingLabel.sinkLabel()*/;
            this.refs.underline.shrinkLine();
            onBlur && onBlur();
          }}
          onChangeText={(text) => {
            this.setState({text});
            this.setState({
              textColor:this.props.fieldColor,
              IconColor:this.props.fieldColor,
            });
            this.refs.underline.UnMarkFieild();
            onChangeText && onChangeText(text);
          }}
          onChange={(event) => {
            if(autoGrow){
              this.setState({height: event.nativeEvent.contentSize.height});
            }
            onChange && onChange(event);
          }}
          ref="input"
          value={(this.state.text === null)?"":this.state.text}
          {...props}
        />
        </View>
        <Underline
          //ref={(ref) => this.underline = underlineOBJ = ref}
          ref="underline"
          highlightColor={highlightColor}
          duration={duration}
          borderColor={borderColor}
        />

      </View>
    );
  }
}

/*<FloatingLabel
  isFocused={this.state.isFocused}
  ref="floatingLabel"
  focusHandler={this.focus.bind(this)}
  label={label}
  labelColor={labelColor}
  highlightColor={highlightColor}
  duration={duration}
  dense={dense}
  hasValue={((this.state.text !== null) && this.state.text.length) ? true : false}
  style={labelStyle}
/>*/

TextField.propTypes = {
  duration: PropTypes.number,
  label: PropTypes.string,
  highlightColor: PropTypes.string,
  labelColor: PropTypes.string,
  borderColor: PropTypes.string,
  textColor: PropTypes.string,
  textFocusColor: PropTypes.string,
  textBlurColor: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  dense: PropTypes.bool,
  inputStyle: PropTypes.object,
  wrapperStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  multiline: PropTypes.bool,
  keyboardType: PropTypes.string,
  autoCapitalize: PropTypes.string,
  autoGrow: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.oneOf(undefined), PropTypes.number])
};

TextField.defaultProps = {
  duration: 200,
  labelColor: '#9E9E9E',
  borderColor: '#E0E0E0',
  textColor: '#000',
  value: '',
  dense: false,
  underlineColorAndroid: 'rgba(0,0,0,0)',
  multiline: false,
  keyboardType: "default",
  autoCapitalize: "none",
  autoGrow: false,
  height: undefined
};

const styles = StyleSheet.create({
  wrapper: {
    height: StyleMethods.getCorrectFontSizeForScreen(72),
    paddingTop: StyleMethods.getCorrectFontSizeForScreen(30),
    paddingBottom: StyleMethods.getCorrectFontSizeForScreen(7),
    position: 'relative'
  },
  denseWrapper: {
    height: StyleMethods.getCorrectFontSizeForScreen(60),
    paddingTop: StyleMethods.getCorrectFontSizeForScreen(25),
    paddingBottom: StyleMethods.getCorrectFontSizeForScreen(4),
    position: 'relative',
  },
  textInput: {
    //marginLeft:50,
    fontSize: StyleMethods.getCorrectFontSizeForScreen(16),
    height: StyleMethods.getCorrectFontSizeForScreen(34),
//    lineHeight: StyleMethods.getCorrectFontSizeForScreen(34),
    textAlignVertical: 'top',
  },
  denseTextInput: {
    //marginLeft:50,
    fontSize: StyleMethods.getCorrectFontSizeForScreen(13),
    height: StyleMethods.getCorrectFontSizeForScreen(27),
//    lineHeight: StyleMethods.getCorrectFontSizeForScreen(24),
    paddingBottom: StyleMethods.getCorrectFontSizeForScreen(3),
    textAlignVertical: 'top',
  },
  icon: {
    paddingVertical:StyleMethods.getFontSize(1),
    fontSize:StyleMethods.getFontSize(20),
    paddingRight:StyleMethods.getFontSize(20),
  }
});
