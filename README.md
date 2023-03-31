# Table Module
This module have been created for an OpenClassroom project.
It's build with React and Javascript.
It generates a table with those functionality : order column, search, paginate.

# How to use it
To works it need an object in props called **config**.

    const config = {
	    title: "title of the table",
	    searchable: true,
	    pagination: true,
	    defaultNumberOfEntries: 10,
	    entriesOptions: [10,20,50,100],
	    columns: [
		    {
			    name: "Name of the column",
			    ref: "userName",
			    orderable: true
		    },
		    {
			    name: "Name of the column",
			    ref: "age",
			    orderable: false
		    },
		    {
			    name: "Name of the column",
			    ref: "dateOfBirth",
			    orderable: true
		    }
	    ],
	    rows: [
		    {
			    userName: "User name",
			    age: 12,
			    dateOfBirth: "04/28/1988"
		    },
		    {
			    userName: "User name",
			    age: 12,
			    dateOfBirth: "04/28/1988"
		    }
	    ]
    }
Then when you import the module passed this object in props.
Such as : `<DisplayTable config={config} />`

## Config details

As seen above, you can activate or not the pagination by setting **true** or **false** to the pagiantion value.
Same to enable the search action you cant set to the searchable value **true** or **false**.

If the pagination is set to false **defaultNumberOfEntires** and **entriesOptions** are not considered.
But else **defaultNumberOfEntries** represents the number of row by default and **entriesOptions** are a collection of values to change the number of entries.

For the **columns** you can set **true** or **false** to the value of **orderable** to activate or not the sorting fonction for this column. The **ref** value must be the name of the key to display in the row object.

For the **rows** the key must the same as the ref column value and value must be string or number but not object array or boolean.

# Dependencies

This module is using font awesome for react.

# Knowed issues

The table isnt responsive yet for screen < 400px

