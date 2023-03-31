import DisplayTable from "./lib/index"

function App() {

  const tableConf = {
    title: 'Test titre tableau',
    searchable: true,
    pagination: true,
    defaultNumberOfEntries: 2,
    entriesOptions: [2, 4, 6, 8, 10],
    columns: [
      {
        name: 'Name',
        ref: 'name'
      },
      {
        name: 'Hours',
        ref: 'heure'
      },
      {
        name: 'Age',
        orderable: true,
        ref: 'age'
      },
      {
        name: 'Job',
        ref: 'job'
      },
      {
        name: 'Date of Birth',
        orderable: true,
        ref: 'dateOfBirth'
      },
      {
        name: 'test',
        orderable: false,
        ref: 'test'
      }
    ],
    rows: [
      {
          name: 'Emil',
          age: 12,
          job: 'charpentier',
          dateOfBirth: '02/25/1980',
          test: 'test',
          test2: 'test2'
      },
      {
          name: 'Filip',
          age: 48,
          job: 'electricien',
          dateOfBirth: '11/02/2008'
      },
      {
          name: 'Jean',
          age: 19,
          job: 'pécheur',
          dateOfBirth: '04/28/1988'
      },
      {
          name: 'Emil',
          age: 17,
          heure: '18h',
          job: 'charpentier',
          dateOfBirth: '02/25/1980'
      },
      {
          name: 'Filip',
          age: 6,
          job: 'electricien',
          dateOfBirth: '11/12/2008'
      },
      {
          name: 'Jean',
          age: 88,
          job: 'pécheur',
          dateOfBirth: '02/04/1988'
      },
      {
          name: 'Jean',
          age: 88,
          job: 'pécheur',
          dateOfBirth: '05/04/1988'
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
