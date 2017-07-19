# node-udp-p2p :video_game:
____

:gem:*Repository for:*

    - Node.js UDP P2P Client 

    - Rendevous Server for UDP Hole Punching 

:gem:*Roadmap:*

    - Place Rendevous Server into separate repository.

    - Create Electron template for udp-based p2p multiplayer using Lance.gg.
[Lance.gg](http://lance.gg)

:gem:*Notes:*

    - P2P Clients are currently stored as separate files with hard-coded secret keys. 
    It will be an exercise for the students to implement a simple CLI for secret key entry.

    - No P2P communication currently exists. 
    It will be an exercise for the students to design a simple transmit and verify message system.
    
    - Rendevous currently references a local HTTP URL for initial testing. 
    Any production Rendevous Server communication should be via HTTPS.