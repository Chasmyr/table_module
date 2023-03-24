import DisplayTable from "./displayTable"

function App() {

  const tableConf = {
    title: 'Test titre tableau',
    searchable: false,
    pagination: true,
    defaultNumberOfEntries: 2,
    columns: [
      {
        name: 'Name',
        orderable: true,
        ref: 'name'
      },
      {
        name: 'Age',
        orderable: true,
        ref: 'age'
      },
      {
        name: 'Job',
        orderable: true,
        ref: 'job'
      },
      {
        name: 'Date of Birth',
        orderable: true,
        ref: 'dateOfBirth'
      }
    ],
    rows: [
      {
          name: 'Emil',
          age: 12,
          job: 'charpentier',
          dateOfBirth: '25/02/1980'
      },
      {
          name: 'Filip',
          age: 48,
          job: 'electricien',
          dateOfBirth: '02/11/2008'
      },
      {
          name: 'Jean',
          age: 19,
          job: 'pécheur',
          dateOfBirth: '28/04/1988'
      },
      {
          name: 'Emil',
          age: 17,
          job: 'charpentier',
          dateOfBirth: '25/02/1980'
      },
      {
          name: 'Filip',
          age: 6,
          job: 'electricien',
          dateOfBirth: '02/11/2008'
      },
      {
          name: 'Jean',
          age: 88,
          job: 'pécheur',
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
