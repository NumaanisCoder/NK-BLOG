const jwt = require('jsonwebtoken');

const idea = jwt.verify('eyJhbGciOiJIUzI1NiJ9.aGFrdW5hbWF0YXRhMDI3QGdtYWlsLmNvbQ.O5fsgrFdW1sU8Ph05JCN5QMcJK9r0x7hqaw5oLlZNuE', 'thisismeorwho');
console.log(idea)