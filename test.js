const jwt = require('jsonwebtoken');

const idea = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDdmMzQ3ZmFlZjEzZmExOTJjMGU2YSIsImlhdCI6MTY5NTAxOTg0OCwiZXhwIjoxNjk1NjI0NjQ4fQ.3bBArQ6OLqgJgF4-6owptYJ6k3EYzyRb0S8zzUobi1Q', 'cristianoronaldogreatestofalltime');
console.log(idea)