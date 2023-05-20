const NoteItem = (props) => {
    return (
        <div className="col-lg-3 col-md-4 my-3 col-sm-6 container-fluid">
            <div className="card" style={{"width": "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <a href="/" className="btn btn-primary mx-2"><i className="fa-solid fa-trash mx-2"></i></a>
                    <a href="/" className="btn btn-primary mx-2"><i className="fa-solid fa-edit mx-2"></i></a>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;