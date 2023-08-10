sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user inputs their text in the given field and clicks submit. The click event on the the submit button is triggered.
    Note right of browser: The event handler for the event then creates an XMLHttpRequest a.k.a "ajax" and sends the request to the server while
    Note right of browser:  waiting for the response from the server

    browser->>server: "XMLHttpRequest [POST:  https://studies.cs.helsinki.fi/exampleapp/new-note-spa]"
    activate server
    Note left of server: The server extracts the payload by using with the "request.body" property and adds the note to the existing list of notes
    server-->>browser: "STATUS 201:created"
    deactivate server