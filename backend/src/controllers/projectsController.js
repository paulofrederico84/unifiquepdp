// controlador básico de projetos (mock)

exports.create = (req, res) => {
  res.status(201).json({id: 'mock-project-id', ...req.body})
}

exports.get = (req, res) => {
  res.json({id: req.params.id, name: 'Mock Project'})
}
