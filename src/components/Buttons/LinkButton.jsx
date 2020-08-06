import React, { useState } from 'react'
import { useSlate } from 'slate-react'
import ToolbarButton from './ToolbarButton'
import LinkIcon from '@material-ui/icons/Link'
import SimpleDialog from '../SimpleDialog'
import { Transforms } from 'slate'

/**
 * Toolbar button for adding links
 *
 * @see ToolbarButton
 */
export default function LinkButton({ ref, ...props }) {
  const editor = useSlate()
  typeof editor.insertLink !== 'function' &&
    console.error('withLinks() is not initialized')
  // Handles the dialog that is opened upon clicking the Link Toolbar/HoveringBar button
  const [openLinkDialog, setOpenLinkDialog] = useState(false)

  // Handles custom buttons click
  const onLinkButtonDown = ({ editor }) => {
    // When the dialog box is opened, the focus is lost as well as current selected text.
    // We need to save it for later on.
    editor.rememberCurrentSelection()
    setOpenLinkDialog(true)
  }

  const handleDialogSave = url => {
    setOpenLinkDialog(false)
    // Adds the link to the editor.
    // The link will wrap the selected text when `rememberCurrentSelection()` was called
    editor.insertLink(url)
  }

  return (
    <React.Fragment>
      <ToolbarButton
        icon={<LinkIcon />}
        type="link"
        tooltip="Add link"
        format="link"
        ref={ref}
        onMouseDown={event => onLinkButtonDown(event)}
        {...props}
      />
      <SimpleDialog
        open={openLinkDialog}
        title="Add Link"
        label="Link"
        format="link"
        onCancel={() => setOpenLinkDialog(false)}
        onSave={({ value }) => handleDialogSave(value)}
      />
    </React.Fragment>
  )
}