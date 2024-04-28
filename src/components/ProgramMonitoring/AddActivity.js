import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormTextarea,
} from '@coreui/react'

function AddActivity({ open, setOpen }) {
  const [allDay, setAllDay] = useState(false) // State to track "All Day Activity" checkbox

  const handleAddActivity = () => {
    // Handle adding activity logic here (to be implemented)
    setOpen(false) // Close modal after adding activity
  }

  return (
    <>
      <CModal
        visible={open}
        onClose={() => setOpen(false)}
        aria-labelledby="LiveDemoExampleLabel"
        backdrop="static"
      >
        <CModalHeader onClose={() => setOpen(false)}>
          <CModalTitle id="LiveDemoExampleLabel">Add an Activity</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            id="activityName"
            placeholder="Activity Name"
            text="Must be 6-20 characters long."
            aria-describedby="exampleFormControlInputHelpInline"
          />
          <CFormTextarea
            id="description"
            placeholder="Description"
            rows={3}
            text="Must be 8-20 words long."
          ></CFormTextarea>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <label htmlFor="allDay" className="form-check-label">
                All Day Activity:
              </label>
              <input
                type="checkbox"
                id="allDay"
                className="form-check-input"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <CFormInput
                type="color"
                id="exampleColorInput"
                defaultValue="#563d7c"
                label="Color :"
                title="Choose your color"
              />
            </div>
          </div>

          {allDay ? (
            <>
              <CFormInput label="Start Day:" type="date" id="startDay" placeholder="Start Day" />
              <CFormInput label="End Day:" type="date" id="endDay" placeholder="End Day" />
            </>
          ) : (
            <>
              <CFormInput
                label="Start Date & Time:"
                type="datetime-local"
                id="startDateTime"
                placeholder="Start Date & Time"
              />
              <CFormInput
                label="End Date & Time:"
                type="datetime-local"
                id="endDateTime"
                placeholder="End Date & Time"
              />
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => setOpen(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleAddActivity}>
            Add
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AddActivity
