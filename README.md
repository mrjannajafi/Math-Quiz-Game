flowchart TD
    A[Start] --> B[Home Page: Choose Level]
    B --> C[User Clicks Level]
    C --> |Easy| D[Generate 10 Questions: Numbers 0-20, + - * /]
    C --> |Medium| E[Generate 10 Questions: Numbers 0-60, + - * /, Parentheses]
    C --> |Hard| F[Generate 10 Questions: Numbers 0-100, + - * /, Parentheses, Exponents]
    D --> G[Start Timer: 60s]
    E --> G
    F --> G
    G --> H{Display Question}
    H --> I[User Answers]
    I --> J{Time Remaining?}
    J --> |Yes| K{All 10 Questions Done?}
    J --> |No| L[Time Up!]
    K --> |No| H
    K --> |Yes| M[Calculate Score]
    L --> M
    M --> N{Score?}
    N --> |8-10| O[Background: Green\nResult: Excellent!]
    N --> |5-7| P[Background: Yellow\nResult: Good!]
    N --> |0-4| Q[Background: Red\nResult: Bad!]
    O --> R[End]
    P --> R
    Q --> R
