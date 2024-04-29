import React from 'react'

export default function Activities({ program }) {
  const { programTitle, logo, programDescription, startDate, endDate, budget } = program
  return (
    <div>
      title:{programTitle} <br />
      startDate:{startDate} <br />
      endDate:{endDate} <br />
      budget:{budget} <br />
      logo:
      <input
        type="image"
        alt="Project Logo"
        style={{ maxWidth: '100px', maxHeight: '100px' }}
        src={logo}
      />
      <br />
      description:{programDescription}
    </div>
  )
}
