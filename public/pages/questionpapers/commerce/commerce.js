let selectedBranch = '';
let selectedSemester = '';

function showSemesters(branch) {
    selectedBranch = branch;
    document.getElementById('branch-options').style.display = 'none';
    document.getElementById('semester-options').style.display = 'block';
    document.getElementById('question-papers').style.display = 'none';
    document.getElementById('back-button').style.display = 'block';
    document.getElementById('qpapers-button').style.display = 'none';
    document.getElementById('back-button').onclick = () => showBranches();
}

function showQuestionPapers(semester) {
    selectedSemester = semester;
    document.getElementById('semester-options').style.display = 'none';
    document.getElementById('question-papers').style.display = 'block';
    document.getElementById('branch-title').innerText = `${selectedBranch} - Semester ${selectedSemester}`;
    document.getElementById('back-button').onclick = () => showSemesters(selectedBranch);

    fetch('subjects.json')
        .then(response => response.json())
        .then(data => {
            const subjects = data[selectedBranch]?.[`semester${selectedSemester}`] || {};
            const questionPapersContainer = document.getElementById('question-papers-container');
            questionPapersContainer.innerHTML = ''; // Clear any existing content

            for (const [subject, papers] of Object.entries(subjects)) {
                const table = document.createElement('table');
                table.innerHTML = `
                    <caption>${subject}</caption>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Month</th>
                            <th>Download Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${papers.map(paper => `
                            <tr>
                                <td>${paper.year}</td>
                                <td>${paper.month}</td>
                                <td><a href="${paper.link}" target="_blank">Download</a></td>
                            </tr>
                        `).join('')}
                    </tbody>
                `;
                questionPapersContainer.appendChild(table);
            }
        });
}

function showBranches() {
    document.getElementById('branch-options').style.display = 'block';
    document.getElementById('semester-options').style.display = 'none';
    document.getElementById('question-papers').style.display = 'none';
    document.getElementById('back-button').style.display = 'none';
    document.getElementById('qpapers-button').style.display = 'block';
    document.getElementById('question-papers-container').innerHTML = ''; // Clear the container
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = 0;
    document.body.style.animation = 'fadeIn 1s forwards';
    document.getElementById('back-button').style.display = 'none';
    document.getElementById('qpapers-button').style.display = 'block'; // Ensure qpapers-button is displayed
    document.getElementById('qpapers-button').onclick = () => window.location.href = '../../questionpapers.html';

    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    // Initialize the site in dark mode by default
    root.style.setProperty('--background-color', '#1e1e2f');
    root.style.setProperty('--text-color', '#d1d1d1');
    root.style.setProperty('--button-background', '#2a2a3b');
    root.style.setProperty('--button-text', '#d1d1d1');
    root.style.setProperty('--button-border', '#4cafef');
    root.style.setProperty('--table-background', '#2a2a3b');
    root.style.setProperty('--table-border', '#4cafef');
    root.style.setProperty('--table-header', '#3a3a4b');
    root.style.setProperty('--link-color', '#4cafef');
    root.style.setProperty('--link-hover-color', '#82cfff');

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            root.classList.remove('light-theme'); // Remove light theme class
            root.style.setProperty('--background-color', '#1e1e2f');
            root.style.setProperty('--text-color', '#d1d1d1');
            root.style.setProperty('--button-background', '#2a2a3b');
            root.style.setProperty('--button-text', '#d1d1d1');
            root.style.setProperty('--button-border', '#4cafef');
            root.style.setProperty('--table-background', '#2a2a3b');
            root.style.setProperty('--table-border', '#4cafef');
            root.style.setProperty('--table-header', '#3a3a4b');
            root.style.setProperty('--link-color', '#4cafef');
            root.style.setProperty('--link-hover-color', '#82cfff');
        } else {
            root.classList.add('light-theme'); // Add light theme class
            root.style.setProperty('--background-color', '#d2cdcd7e');
            root.style.setProperty('--text-color', '#000000');
            root.style.setProperty('--button-background', '#e0e0e0');
            root.style.setProperty('--button-text', '#000000');
            root.style.setProperty('--button-border', '#4a90e2');
            root.style.setProperty('--table-background', '#ffffff');
            root.style.setProperty('--table-border', '#4a90e2');
            root.style.setProperty('--table-header', '#f0f2f5');
            root.style.setProperty('--link-color', '#4a90e2');
            root.style.setProperty('--link-hover-color', '#357ab8');
        }
    });
});
