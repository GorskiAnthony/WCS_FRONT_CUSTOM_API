import { useState } from "react";

const App = () => {
	const API = "http://localhost:5500/api/users";
	const [trainers, setTrainers] = useState([]);
	const fetchData = () => {
		fetch(API)
			.then((res) => res.json())
			.then((data) => setTrainers(data.users));
	};

	fetchData();

	return (
		<div>
			<h1>Liste des formateurs</h1>
			<ul>
				{trainers.map((trainer) => (
					<li key={trainer.id}>{trainer.name}</li>
				))}
			</ul>

			<form>
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
