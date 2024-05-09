```mermaid
sequenceDiagram
    Participant browser
    Participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note 'Hello World'
    activate server
    Note right of browser: The user sends the data by entering the value in the input field and submitting the form.
    server-->>browser: Server instructs the browser to redirect to the URL in the headers location
    deactivate server
    Note left of server: The server recieves the data through the body of the POST request and adds it to the notes list.

    Note right of browser: The redirect causes the browser to reload the notes page.
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document.
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file.
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: Javascript file.
    deactivate server
    Note right of browser: The browser starts executing the javascript code that fetches the JSON data from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: Notes list in JSON format.
    deactivate server
    Note right of browser: The browser executes the callback function that renders the notes.


    

