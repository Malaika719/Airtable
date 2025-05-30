import React, { useEffect, useState } from 'react'

const getData = () => {
  const stored = localStorage.getItem('data')
  return stored ? JSON.parse(stored) : []
}

function TodoApp() {
  const [form, setForm] = useState({ name: '', age: '', address: '', contact: '' })
  const [data, setData] = useState(getData())
  const [editIndex, setEditIndex] = useState(null)

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data))
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const clearForm = () => setForm({ name: '', age: '', address: '', contact: '' })

  const handleAdd = () => {
    if (!form.name && !form.age && !form.address && !form.contact) {
      alert('Please enter all fields')
      return
    }
    setData(prev => [...prev, form])
    clearForm()
  }

  const handleDelete = (i) => {
    const updated = [...data]
    updated.splice(i, 1)
    setData(updated)
  }

  const handleEdit = (i) => {
    setForm(data[i])
    setEditIndex(i)
  }

  const handleUpdate = () => {
    if (editIndex === null) return
    const updated = [...data]
    updated[editIndex] = form
    setData(updated)
    setEditIndex(null)
    clearForm()
  }

  const shiftUp = (i) => {
    const updated = [...data]
    if (i === 0) {
      updated.push(updated.shift())
    } else {
      [updated[i], updated[i - 1]] = [updated[i - 1], updated[i]]
    }
    setData(updated)
  }

  const shiftDown = (i) => {
    const updated = [...data]
    if (i === updated.length - 1) {
      updated.unshift(updated.pop())
    } else {
      [updated[i], updated[i + 1]] = [updated[i + 1], updated[i]]
    }
    setData(updated)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '10px' }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="ENTER NAME" />
        <input name="age" value={form.age} onChange={handleChange} placeholder="AGE" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="ADDRESS" />
        <input name="contact" value={form.contact} onChange={handleChange} placeholder="CONTACT" />
        <button onClick={handleAdd}>ADD</button>
        <button onClick={handleUpdate}>UPDATE</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Delete</th>
            <th>Edit</th>
            <th>UP</th>
            <th>DOWN</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>{d.name}</td>
              <td>{d.age}</td>
              <td>{d.address}</td>
              <td>{d.contact}</td>
              <td><button onClick={() => handleDelete(i)}>DELETE</button></td>
              <td><button onClick={() => handleEdit(i)}>EDIT</button></td>
              <td><button onClick={() => shiftUp(i)}>UP</button></td>
              <td><button onClick={() => shiftDown(i)}>DOWN</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TodoApp
