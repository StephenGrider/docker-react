import './index.css';
import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net'; 
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  useEffect(() => {
    const table = $('#myTable').DataTable({
      paging: true,
      pageLength: 20,
      scrollX: true,
      scrollY: 500,
      ajax: 'data.json',
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json',
      },
      columns: [
        {
          data: function(data) {
            return data['First_Name_Required'] + ' ' + data['Last_Name_Required'];
          },
        },
        { data: 'Email_Address_Required', searchable: true }, 
        {
          data: 'Last_Sign_In_READ_ONLY',
          searchable: true,
          render: function(data) {
            if (data === "Never logged in") {
              return "Nunca fez login";
            }
            
            if (data) {
              var spaceIndex = data.indexOf(' ');
              if (spaceIndex !== -1) {
                var datePart = data.substring(0, spaceIndex);
                var timePart = data.substring(spaceIndex + 1);
                var slashIndex1 = datePart.indexOf('/');
                var slashIndex2 = datePart.lastIndexOf('/');
                if (slashIndex1 !== -1 && slashIndex2 !== -1 && slashIndex1 !== slashIndex2) {
                  var day = datePart.substring(0, slashIndex1);
                  var month = datePart.substring(slashIndex1 + 1, slashIndex2);
                  var year = datePart.substring(slashIndex2 + 1);
                  return `${year}/${month}/${day} ${timePart}`;
                }
              }
            }
            
            return data;
          },
        },
        { data: 'Org_Unit_Path_Required', searchable: true },
        { data: 'Status_READ_ONLY', searchable: true },
        { data: 'Recovery_Email', searchable: true },
        { data: 'Home_Secondary_Email', searchable: true },
        { data: 'Work_Secondary_Email', searchable: true },
        { data: 'Work_Phone', searchable: true },
        { data: 'Home_Phone', searchable: true },
        { data: '2sv_Enrolled_READ_ONLY', searchable: true },
        { data: '2sv_Enforced_READ_ONLY', searchable: true },
        { data: 'Change_Password_at_Next_Sign-In', searchable: true },
        { data: 'Licenses_READ_ONLY', searchable: true },
        { data: 'Advanced_Protection_Program_enrollment', searchable: true },
      ],
    });

    $('#filterNeverLoggedIn').on('click', function () {
      table.search('Nunca fez login').draw();
    });

    const apiUrl = 'https://apigw.1doc.com.br';
    let apiData = {
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na solicitação: ${response.statusText}`);
        }
        return response.json();
      })
      .then(apiResponse => {
        console.log('Resposta da API:', apiResponse);
      })
      .catch((error) => {
        console.error('Erro na solicitação:', error);
      });
    
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <button id="filterNeverLoggedIn" className="btn btn-primary mb-3 float-md-end">
            Filtrar por quem nunca fez login
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <table id="myTable" className="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Último login</th>
                <th>Caminho da unidade organizacional obrigatório</th>
                <th>Status</th>
                <th>Email de recuperação</th>
                <th>E-mail secundário inicial</th>
                <th>E-mail secundário de trabalho</th>
                <th>Telefone de Trabalho</th>
                <th>Telefone residencial</th>
                <th>2sv inscrito</th>
                <th>2sv aplicado</th>
                <th>Alterar senha no próximo login</th>
                <th>Licenças</th>
                <th>Inscrição no Programa Proteção Avançada</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
