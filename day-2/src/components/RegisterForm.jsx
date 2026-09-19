function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [form, setForm] = useState({
        name: '',
        email: '',
        age: ''
    });

    const updateForm = (field, value) => {
        setForm({
            ...form,
            [field]: value
        });
    }

    const validateForm = () => {
        if (!form.name || !form.email || !form.age) {
            alert('Please fill in all fields');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            alert('Please enter a valid email address');
            return false;
        }
        if (isNaN(form.age) || form.age <= 0) {
            alert('Please enter a valid age');
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert(`Form submitted successfully!\nName: ${form.name}\nEmail: ${form.email}\nAge: ${form.age}`);
        }
    };

    return (
        <form className="p-8" onSubmit={(e) => {
            e.preventDefault();
            updateForm('name', form.name);
            updateForm('email', form.email);
            updateForm('age', form.age);
            }}
            >
            <input value={name} onChange={(e) => updateForm('name', e.target.value)} type="text" placeholder="Username" />
            <input value={email} onChange={(e) => updateForm('email', e.target.value)} type="email" placeholder="Email" />
            <input value={age} onChange={(e) => updateForm('age', e.target.value)} type="number" placeholder="Age" />
            <br />
            <button type="submit">Register</button>
        </form>
    )
}

export default RegisterForm;