import { useState } from 'react'
import { countries } from '../../data/countries'
import styles from './Form.module.css'
import type { SearchType } from '../../types'
import Alert from '../Alert/Alert'

export default function Form() {
  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: '',
  })

  const [alert, setAlert] = useState('')

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setSearch({
      ...search,
      [name]: value,
    })
  }

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Object.values(search).includes('')) {
      setAlert('Todos los campos son obligatorios')
      return
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSumbit}>
      {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor="city">Ciudad:</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Ciudad"
          value={search.city}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="country">País:</label>
        <select
          id="country"
          name="country"
          value={search.country}
          onChange={handleChange}
        >
          <option value="">-- Seleccione un País --</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <input className={styles.submit} type="submit" value="Consultar Clima" />
    </form>
  )
}
