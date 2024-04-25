import { CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap'
import axiosInstance from '../../axiosInstance'

const EditProfileModal = ({ userData, setUserData, setUpdateLog, isOpen, setIsOpen }) => {
  const [additionalLinks, setAdditionalLinks] = useState([''])
  const [editedData, setEditedData] = useState([])

  const handleAddLink = () => {
    setAdditionalLinks([...additionalLinks, ''])
  }
  const handleRemoveLink = (index) => {
    const newAdditionalLinks = [...additionalLinks]
    if (index === 0) return
    newAdditionalLinks.splice(index, 1)
    setAdditionalLinks(newAdditionalLinks)
  }

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...additionalLinks]
    updatedLinks[index] = value
    setAdditionalLinks(updatedLinks)
  }
  const handleConfirm = async () => {
    try {
      const updatedData = {}
      editedData.forEach((field) => {
        updatedData[field] = userData[field]
      })
      const response = await axiosInstance.put(`/users/${userData._id}`, updatedData)
      if (response.status === 200) {
        console.log('User updated successfully:', response.data)
        if (editedData.length > 0) {
          // Check if editedData is not empty
          editedData.forEach((element) => {
            const currentDate = new Date().toLocaleDateString()
            setUpdateLog((prevUpdateLog) => {
              const updatedLogs = [...prevUpdateLog]
              const existingLogIndex = updatedLogs.findIndex((log) => log.date === currentDate)
              if (existingLogIndex !== -1) {
                updatedLogs[existingLogIndex].events.push(
                  `User update ${element} at ${new Date().toLocaleTimeString()}`,
                )
              } else {
                updatedLogs.push({
                  date: currentDate,
                  events: [`User update ${element} at ${new Date().toLocaleTimeString()}`],
                })
              }
              return updatedLogs
            })
          })
        }
        setEditedData(null)
      } else {
        console.error('Failed to update user:', response.statusText)
      }
    } catch (error) {
      console.error('Error updating user:', error.message)
    }
    setIsOpen(false)
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
    setEditedData((prev) => {
      if (prev === null) return [name]
      const index = prev.indexOf(name)
      if (index !== -1) {
        // If name exists, update it
        const updatedData = [...prev]
        updatedData[index] = name
        return updatedData
      } else {
        // If name doesn't exist, add it
        return [...prev, name]
      }
    })
  }

  return (
    <Modal isOpen={isOpen} toggle={() => setIsOpen(false)} size="lg">
      {' '}
      {/* 'lg' for large modal on large screens */}
      <ModalHeader toggle={() => setIsOpen(false)}>Edit Profile</ModalHeader>
      <ModalBody>
        <Container>
          <Row>
            <Col md="12">
              <FormGroup>
                <Label for="bioInput">Bio</Label>
                <Input type="textarea" id="bioInput" name="bio" onChange={handleChange} />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label for="linkedinInput">LinkedIn</Label>
                <Input type="text" id="linkedinInput" name="linkedIn" onChange={handleChange} />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>Additional Links</Label>
                {additionalLinks.map((link, index) => (
                  <CInputGroup key={index} className="mb-4">
                    <CFormInput
                      key={index}
                      type="text"
                      value={link}
                      onChange={(e) => handleLinkChange(index, e.target.value)}
                      placeholder="Enter link"
                    />
                    <CInputGroupText
                      className="bg-danger text-white"
                      onClick={() => handleRemoveLink(index)}
                    >
                      X
                    </CInputGroupText>
                  </CInputGroup>
                ))}
                <Button className="mt-2" color="primary" onClick={handleAddLink}>
                  Add Link
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleConfirm}>
          Save
        </Button>
        <Button color="secondary" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default EditProfileModal
