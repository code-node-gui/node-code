
import IfNode from "../nodes/control/IfNode.jsx";
import StartNode from "../nodes/control/StartNode.jsx";
import TextNode from "../nodes/input/TextNode.jsx";
import NumberNode from "../nodes/input/NumberNode.jsx";
import LoopNode from "../nodes/control/LoopNode.jsx";
import EqualNode from "../nodes/operators/EqualNode.jsx";
import BiggerNode from "../nodes/operators/Bigger.jsx";
import SmallerNode from "../nodes/operators/Smaller.jsx";
import AddNode from "../nodes/math/Add.jsx";
import SubNode from "../nodes/math/Sub.jsx";
import MulNode from "../nodes/math/Mul.jsx";
import DivNode from "../nodes/math/Div.jsx";
import OutputNode from "../nodes/output/OutputNode.jsx";
import TrueNode from "../nodes/operators/TrueNode.jsx";
import FalseNode from "../nodes/operators/FalseNode.jsx";
import CreateVar from "../nodes/variables/CreateVar.jsx";
import SetVar from "../nodes/variables/SetVar.jsx";
import GetVar from "../nodes/variables/GetVar.jsx";
import Ask from "../nodes/input/Ask.jsx";
import Display from "../nodes/output/Display.jsx";
import Button from "../nodes/Elements/Button.jsx";
import DivElm from "../nodes/Elements/Div.jsx";
import Screen from "../nodes/output/Screen.jsx";
import And from "../nodes/operators/And.jsx";
import Or from "../nodes/operators/Or.jsx";
import Not from "../nodes/operators/Not.jsx";
import SetText from "../nodes/control/SetText.jsx";
import Input from "../nodes/Elements/Input.jsx";
import SetValue from "../nodes/control/SetValue.jsx";
import GetValue from "../nodes/control/GetValue.jsx";
import Text from "../nodes/Elements/Text.jsx";
import CreateFun from "../nodes/functions/CreateFun.jsx";
import FireFun from "../nodes/functions/FireFun.jsx";
import Style from "../nodes/Style/Style.jsx";
import GetStyle from "../nodes/Style/GetStyle.jsx";
import BackgroundC from "../nodes/Style/Background.jsx"
import Color from "../nodes/Style/Color.jsx";
import FontSize from "../nodes/Style/Fontsize.jsx";
import SetStyle from "../nodes/control/SetStyle.jsx";
import CreateArray from "../nodes/variables/CreateArray.jsx";
import ArrayItem from "../nodes/variables/ArrayItem.jsx";
import GetItem from "../nodes/variables/GetItem.jsx";
import ChangeVarBy from "../nodes/variables/ChangeVarBy.jsx";
import LoopIndex from "../nodes/control/LoopIndex.jsx";
import SetParam from "../nodes/functions/SetParam.jsx";
import GetParam from "../nodes/functions/GetParam.jsx";
import RandomNum from "../nodes/math/RandomNum.jsx";
import Return from "../nodes/functions/Return.jsx";
import WidthVal from "../nodes/Style/WidthVal.jsx";
import HightVal from "../nodes/Style/HightVal.jsx";
import DisplayCss from "../nodes/Style/display.jsx";
import FlexDir from "../nodes/Style/FlexDir.jsx";
import Flex from "../nodes/Style/Flex.jsx";
import AddToArray from "../nodes/variables/AddToArray.jsx";
import Sleep from "../nodes/control/Sleep.jsx"
import ReturningLoop from "../nodes/control/ReturningLoop.jsx";
import ReturningIf from "../nodes/control/ReturningIf.jsx";



export default [
    { node: <StartNode list={true} />, type: "Start",cat:"control" },
    { node: <IfNode list={true} />, type: "If",cat:"control" },
    { node: <LoopNode list={true} />, type: "Loop" ,cat:"control"},
    { node: <LoopIndex list={true} />, type: "LoopIndex" ,cat:"control"},
    { node: <SetText list={true} />, type: "SetText" ,cat:"control"},
    { node: <SetValue list={true} />, type: "SetValue" ,cat:"control"},
    { node: <SetStyle list={true} />, type: "SetStyle" ,cat:"control"},
    { node: <GetValue list={true} />, type: "GetValue" ,cat:"control"},
    { node: <Sleep list={true} />, type: "Sleep" ,cat:"control"},
    { node: <ReturningLoop list={true} />, type: "ReturningLoop" ,cat:"control"},
    { node: <ReturningIf list={true} />, type: "ReturningIf" ,cat:"control"},

    { node: <TextNode list={true} />, type: "text",cat:"input" },
    { node: <NumberNode list={true} />, type: "number",cat:"input" },
    // { node: <Ask list={true} />, type: "Ask",cat:"input" },

    { node: <OutputNode list={true} />, type: "Output",cat:"output" },
    { node: <Display list={true} />, type: "Display",cat:"output" },
    { node: <Screen list={true} />, type: "Screen",cat:"output" },

    { node: <TrueNode list={true} />, type: "TrueNode",cat:"operators" },
    { node: <FalseNode list={true} />, type: "FalseNode",cat:"operators" },
    { node: <EqualNode list={true} />, type: "Equal" , cat:"operators"},
    { node: <BiggerNode list={true} />, type: "Bigger", cat:"operators" },
    { node: <SmallerNode list={true} />, type: "Smaller", cat:"operators" },
    { node: <And list={true} />, type: "And", cat:"operators" },
    { node: <Or list={true} />, type: "Or", cat:"operators" },
    { node: <Not list={true} />, type: "Not", cat:"operators" },

    { node: <AddNode list={true} />, type: "Add", cat:"math" },
    { node: <SubNode list={true} />, type: "Sub", cat:"math" },
    { node: <MulNode list={true} />, type: "Mul", cat:"math" },
    { node: <DivNode list={true} />, type: "Div", cat:"math" },
    { node: <RandomNum list={true} />, type: "RandomNum", cat:"math" },


    { node: <CreateVar list={true} />, type: "CreateVar",cat:"variables" },
    { node: <SetVar list={true} />, type: "SetVar",cat:"variables" },
    { node: <GetVar list={true} />, type: "GetVar",cat:"variables" },
    { node: <CreateArray list={true} />, type: "CreateArray",cat:"variables" },
    { node: <ArrayItem list={true} />, type: "ArrayItem",cat:"variables" },
    { node: <GetItem list={true} />, type: "GetItem",cat:"variables" },
    { node: <ChangeVarBy list={true} />, type: "ChangeVarBy",cat:"variables" },
    { node: <AddToArray list={true} />, type: "AddToArray",cat:"variables" },

    { node: <CreateFun list={true} />, type: "CreateFun",cat:"functions" },
    { node: <FireFun list={true} />, type: "FireFun",cat:"functions" },
    { node: <SetParam list={true} />, type: "SetParam",cat:"functions" },
    { node: <GetParam list={true} />, type: "GetParam",cat:"functions" },
    { node: <Return list={true} />, type: "Return",cat:"functions" },


    { node: <Button list={true} />, type: "Button",cat:"elements" },
    { node: <DivElm list={true} />, type: "DivElm",cat:"elements" },
    { node: <Input list={true} />, type: "Input",cat:"elements" },
    { node: <Text list={true} />, type: "Text",cat:"elements" },


    { node: <Style list={true} />, type: "Style",cat:"style" },
    { node: <GetStyle list={true} />, type: "GetStyle",cat:"style" },
    { node: <BackgroundC list={true} />, type: "Background",cat:"style" },
    { node: <Color list={true} />, type: "Color",cat:"style" },
    { node: <FontSize list={true} />, type: "FontSize",cat:"style" },
    { node: <WidthVal list={true} />, type: "WidthVal",cat:"style" },
    { node: <HightVal list={true} />, type: "HightVal",cat:"style" },
    { node: <DisplayCss list={true} />, type: "DisplayCss",cat:"style" },
    { node: <FlexDir list={true} />, type: "FlexDir",cat:"style" },
    { node: <Flex list={true} />, type: "Flex",cat:"style" },
]





export const nodeType = {
  Output: OutputNode,
  Display,
  ReturningLoop,
  ReturningIf,

  If: IfNode,
  LoopIndex,

  text: TextNode,
  number: NumberNode,
  Ask: Ask,

  Start: StartNode,
  TrueNode: TrueNode,
  FalseNode: FalseNode,
  Loop: LoopNode,
  Equal: EqualNode,
  Bigger: BiggerNode,
  Smaller: SmallerNode,
  SetText,
  SetValue,
  GetValue,
  SetStyle,
  Sleep,

  Add: AddNode,
  Sub: SubNode,
  Mul: MulNode,
  Div: DivNode,
  RandomNum,

  CreateVar,
  GetVar,
  SetVar,
  CreateArray,
  ArrayItem,
  GetItem,
  ChangeVarBy,
  AddToArray,

  And,Or,Not,

  Button,
  DivElm,
  Screen,
  Input,
  Text,

  CreateFun,
  FireFun,
  SetParam,
  GetParam,
  Return,

  Style,
  GetStyle,
  Background:BackgroundC,
  Color,
  FontSize,
  WidthVal,
  HightVal,
  DisplayCss,
  FlexDir,
  Flex,
};