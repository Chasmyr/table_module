import DisplayTable from "./displayTable"

function App() {

  const tableConf = {
    title: 'Test titre tableau',
    searchable: false,
    pagination: true,
    defaultNumberOfEntries: 10,
    columns: [
      {
        name: 'Name',
        orderable: false
      },
      {
        name: 'Age',
        orderable: true
      },
      {
        name: 'Job',
        orderable: false
      },
      {
        name: 'Date of Birth',
        orderable: false
      }
    ],
    rows: [
      {
          name: 'Emil',
          age: 12,
          job: 'test',
          dateOfBirth: '25/02/1980'
      },
      {
          name: 'Filip',
          age: 48,
          job: 'test2',
          dateOfBirth: '02/11/2008'
      },
      {
          name: 'Jean',
          age: 19,
          job: 'test3',
          dateOfBirth: '28/04/1988'
      },
    ] 
  }

  return (
    <>
      <DisplayTable config={tableConf} />
    </>
  )
}

export default App
