let subjectsTable;

// (~) Active Students

document.addEventListener("DOMContentLoaded", function () {
  const gridDiv = document.querySelector('#subjectsOffered');
  fetch('group1/subjects_offered').then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }).then(data => {
    const gridOptions = {
      defaultColDef: {
        flex: 1,
        headerClass: 'fw-bold roboto-regular',
        cellClass: 'roboto-regular',
        filter: true,
      },
      domLayout: 'autoHeight',
      rowData: data,
      columnDefs: [
        { field: 'code', headerName: 'Code'},
        { field: 'name', headerName: 'Name', cellClass: 'fw-semibold',flex: 2},
        { field: 'course_id', headerName: 'Course'},
        { field: 'year_level', headerName: 'Year Level'},
        { field: 'semester', headerName: 'Semester'},
        { field: 'instructor_id', headerName: 'Instructor', flex: 2},
        {
          headerName: 'Actions',
          field: 'actions',
          cellRenderer: (params) => {
            const viewButton = `<button class="btn btn-sm btn-navy px-3" style="font-size: 12px;" onclick="viewSubject('${params.data.id}')">View</button>`;
            const editButton = `<button class="btn btn-sm btn-yellow-2 px-3 text-navy" style="font-size: 12px;" onclick="editSubject('${params.data.id}')">Edit</button>`;
            const deleteButton = `<button class="btn btn-sm btn-red px-3" style="font-size: 12px;" onclick="deleteSubject('${params.data.id}')">Delete</button>`;
            return viewButton + ' ' + editButton + ' ' + deleteButton;
          },
          cellStyle: { textAlign: 'right' },
          flex: 2,
        },
      ],
      pagination: true,
      paginationPageSize: 50,
    }
    subjectsTable = agGrid.createGrid(gridDiv, gridOptions);
  }).catch(error => console.error('Error fetching row data: ', error));
});   

function searchSubjectsTable() {
  const searchValue = document.getElementById('searchSubjects').value;
  coursesTable.setGridOption(
    "quickFilterText",
    searchValue,
  );
}

function viewSubject(id) {
  window.location.href = `/group1/subjects-view?id=${id}`;
}

function editSubject(id) {
  window.location.href = `/group1/subjects-edit?id=${id}`;
}

function deleteSubject(id) {
  window.location.href = `/group1/subjects-delete?id=${id}`;
}