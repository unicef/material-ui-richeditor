
import React from "react"
import Basic from './Basic'
import Advanced from './Advanced'
import { useState, useMemo, useCallback } from "react"
import { hot } from "react-hot-loader" //Auto refresh load
import {
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  Toolbar,
  BoldButton,
  ItalicButton,
  CodeButton,
  UnderlinedButton,
  StrikethroughButton,
  BulletedListButton,
  NumberedListButton,
  AddCommentButton,
  EndnoteButton,
  ToolbarButton,
  SimpleDialog,
  HoveringToolbar
} from '../src'

import { makeStyles } from '@material-ui/core/styles'
import AddCommentButton from "../src/components/Buttons/CommentButton"

// Initial content of the editor 
import initialValue from './initialValue'

const useStyles = makeStyles(theme => ({
  comment: {
    backgroundColor: "#1CABE2"
  }
}))

export default hot(module)(function App() {

  const classes = useStyles()

  const [value, setValue] = useState(initialValue)
  const editor = useMemo(() => createMaterialEditor(), [])
  const [openCommentDialog, setOpenCommentDialog] = useState(false)
  const [openEndnoteDialog, setOpenEndnoteDialog] = useState(false)


  const onCustomButtonDown = ({ event, type, format, editor }) => {
    switch (format) {
      case 'comment':
        //Setup the dialog
        console.log('selection', editor.selection)
        editor.startAddComment()
        setOpenCommentDialog(true)
        return
      case 'endnote':
        editor.startEndNote()
        setOpenEndnoteDialog(true)
        return
    }
  }

  const handleDialogCancel = () => {
    console.log('Dialog cancelled')
    setOpenCommentDialog(false)
    setOpenEndnoteDialog(false)
  }

  const handleDialogSave = (format, dialogValue) => {
    //Here you could call an API to store the comment
    switch (format) {
      case 'comment':
        setOpenCommentDialog(false)
        console.log('save Comment:' + dialogValue)
        const id = new Date().getTime();
        editor.addComment(id, { comment: dialogValue })

        return
      case 'endnote':
        setOpenCommentDialog(false)
        console.log('save Endnote:' + value)
        //editor.addEndnote(id, {endnote: value})
        return
    }
  }

  const handleRenderElement = useCallback(({ element, children, attributes, ...rest }) => {
    switch (element.type) {
      case 'comment':
        console.log('render comment')
        return <span className={classes.comment} {...attributes}>{children}</span>
    }
    return <p {...attributes} {...rest}>{children}</p>
  }, [])

  return (
    <div className="App">
      <h1>Basic Editor Example</h1>
      <a href="http://url">Source code</a> 
      <Basic />

      <h1>Advanced usage </h1>
      <a href="http://url">Source code</a>
      <Advanced />
    </div>
  );
})



