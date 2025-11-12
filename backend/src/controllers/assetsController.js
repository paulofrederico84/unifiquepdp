exports.list = (req, res) => {
    res.json([
        { id: 'a1', type: 'camera', model: 'AXIS P3225', location: 'Entrada' },
        { id: 'a2', type: 'router', model: 'TP-Link AX1500', location: 'Rack' }
    ])
}
