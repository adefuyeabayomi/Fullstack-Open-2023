sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user inputs their text in the given field and clicks submit
    browser->>server: "POST:  https://studies.cs.helsinki.fi/exampleapp/new-note"
    activate server
    Note left of server: The server extracts the payload by using with the "request.body" property and adds the note to the existing list of notes
    server->>browser: "Adds the note to the list of notes and redirects the browser to https://studies.cs.helsinki.fi/exampleapp/notes"
    deactivate server