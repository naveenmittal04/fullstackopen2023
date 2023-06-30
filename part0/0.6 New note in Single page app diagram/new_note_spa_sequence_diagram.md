```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: json {message: "note created"}
    deactivate server

    Note right of browser: The browser executes the redrawNotes function that renders the updated notes
```