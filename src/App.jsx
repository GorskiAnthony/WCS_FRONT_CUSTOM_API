import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
	const API = "http://localhost:5500/api/users";

	const [trainers, setTrainers] = useState([]);
	const fetchData = () => {
		fetch(API)
			.then((res) => res.json())
			.then((data) => setTrainers(data.users));
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const name = e.target[0].value;
		/**
     * Ok avec axios ✅
		axios
			.post(API, { name })
			.then((res) => alert(res.data.message))
			.then(() => fetchData());
      */

		// fetch(API, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({ name }),
		// })
		// 	.then((res) => res.json())
		// 	.then((data) => alert(data.message))
		// 	.then(() => fetchData());

		try {
			const res = await fetch(API, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name }),
			});
			const data = await res.json();
			alert(data.message);
			fetchData();
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = (id) => {
		axios.delete(`${API}/${id}`).then(() => fetchData());
	};

	return (
		<div>
			<h1>Liste des formateurs</h1>
			<ul>
				{trainers.map((trainer) => (
					<li key={trainer.id}>
						{trainer.name}
						<button onClick={() => handleDelete(trainer.id)}>
							modifier
						</button>
						<button onClick={() => handleDelete(trainer.id)}>
							supprimer
						</button>
					</li>
				))}
			</ul>

			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Nom du formateur</label>
				<input
					type="text"
					name="name"
					id="name"
					placeholder="Chuck Norris"
				/>
				<button type="submit">Ajouter</button>
			</form>
		</div>
	);
};

export default App;
