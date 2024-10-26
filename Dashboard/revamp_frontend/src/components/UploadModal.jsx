import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

const UploadModal = ({ modal, setModal }) => {
    const folderInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const [upload, setUpload] = useState(true);
    const [msg, setMsg] = useState("");
    const [isFolderUpload, setIsFolderUpload] = useState(true); // Track upload type

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        if (isFolderUpload) {
            const selectedFiles = folderInputRef.current.files;
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append("dir", selectedFiles[i]);
            }
        } else {
            const selectedFile = fileInputRef.current.files[0];
            if (selectedFile) {
                formData.append("dir", selectedFile);
            }
        }
        const requestOptions = {
            method: "POST",
            body: formData,
        };
        fetch(`${process.env.REACT_APP_FLASK_URL}/upload`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("File upload failed");
                }
                setModal(false);
                setMsg("");
            })
            .catch((err) => {
                console.error(err);
                setMsg("File upload failed, please try again.");
            });
    }

    function update() {
        const numFiles = isFolderUpload ? folderInputRef.current?.files?.length : fileInputRef.current?.files?.length;

        if (numFiles > 0) {
            setUpload(false);
            setMsg(`${numFiles} file(s) selected`);
        } else {
            setUpload(true);
            setMsg(""); // Clear message if no files are selected
        }
    }

    function updateSingleFile() {
        if (fileInputRef.current.files.length > 0) {
            setMsg(`${fileInputRef.current.files.length} file(s) selected`);
        } else {
            setMsg(""); // Clear message if no files are selected
        }
    }

    return (
        <Modal
            backdrop="static"
            centered
            show={modal}
            onHide={() => setModal(false)}
        >
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="file-upload">
                    <h4>Upload Files (HTML, CSS, JS, TXT)</h4>

                    {/* Folder Upload Input */}
                    <input
                        type="file"
                        webkitdirectory=""
                        ref={folderInputRef}
                        onChange={update}
                        style={{ display: "none" }}
                    />
                    <label className="custom-upload" onClick={() => {
                        setIsFolderUpload(true);
                        folderInputRef.current.click(); // Programmatically click the input
                    }}>
                        <FontAwesomeIcon icon={faUpload} size={"2xl"} style={{ color: "#478cfb" }} />
                        <p>Click to browse folders</p>
                    </label>

                    {/* Single File Upload Input */}
                    <input
                        type="file"
                        accept=".html,.css,.js,.txt" // Specify accepted file types
                        ref={fileInputRef}
                        onChange={() => {
                            updateSingleFile();
                            update(); // Call update to update the message
                        }}
                        style={{ display: "none" }}
                    />
                    <label className="custom-upload" onClick={() => {
                        setIsFolderUpload(false);
                        fileInputRef.current.click(); // Programmatically click the input
                    }}>
                        <FontAwesomeIcon icon={faUpload} size={"2xl"} style={{ color: "#478cfb" }} />
                        <p>Click to browse files</p>
                    </label>

                    <p>{msg}</p>
                </div>
                <div className="col-sm d-flex justify-content-between mx-4 mb-2">
                    <Button
                        className="px-4"
                        variant="danger"
                        onClick={() => {
                            setMsg("");
                            setModal(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="px-4"
                        variant="success"
                        type="submit"
                        value="Upload"
                        disabled={upload}
                    >
                        Upload
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default UploadModal;
