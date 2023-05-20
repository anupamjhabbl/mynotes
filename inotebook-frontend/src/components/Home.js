function Home() {
    return (
        <div className="Home container">
            <div className="notes_form">
                <h1 className="my-3">Add a Note</h1>
                <form>
                    <div class="mb-3">
                        <label for="note_title" class="form-label">Title</label>
                        <input type="text" class="form-control" id="note_title" name="title" aria-describedby="emailHelp" required />
                        <div id="emailHelp" class="form-text">Your title must be unique from other title</div>
                    </div>
                    <div class="mb-3">
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a comment here" id="note_description" name="description" style={{ "height": "200px" }}></textarea>
                            <label for="note_description">Comments</label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="note_tag" class="form-label">Tag</label>
                        <input type="text" class="form-control" id="note_tag" name="tag" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <div className="your_notes my-5">
                <h1 className="my-3">Your Notes</h1>
            </div>
        </div>
    )
}

export default Home;