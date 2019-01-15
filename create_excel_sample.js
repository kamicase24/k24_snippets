    if (Object.keys(this.data).length > 0) {
        var data = this.data
        var workbook = XLSX.utils.book_new()
        workbook.Props = {
            Title: 'Kardex',
            Subject: 'Ubicación',
            Author: 'Lab Nutrition',
            CreatedDate: new Date()
        }

        for (var k in data) {

            var sheet_name = k.substr(0, 28) + '...'
            workbook.SheetNames.push(sheet_name)
            var worksheet_data = [['Fecha', 'Num. de Documento', 'Num. de Operación', 'Nombre', 'Tipo de Operación', 'Código de Barras', 'Lotes', 'Fecha de Vencimiento', 'Ingreso', 'Salida', 'Saldo', 'Doc. de Origen'], []]
            data[k].forEach(function (row) {
                function set_doc_number(row) {
                    var doc_a = row['doc_number']
                    if (!row['doc_id']) {
                        if (row['opt_number']) {
                            doc_a = row['opt_number']
                        } else {
                            doc_a = row['doc_model']
                        }
                    }
                    if (row['doc_id']) {
                        if (!row['doc_number']) {
                            doc_a = row['doc_model']
                        }
                    }
                    return doc_a
                }
                function set_opt_number(row) {
                    var opt_a = row['opt_number']
                    if (!row['opt_number']) {
                        opt_a = row['opt_model']
                    }
                    return opt_a
                }

                var doc_number = set_doc_number(row)
                var opt_number = set_opt_number(row)

                if (!Object.keys(row).includes('init_balance')) {
                    worksheet_data.push([row['date'], doc_number, opt_number, row['name'], row['operation_type'], row['barcode'], row['lot'], row['life_date'], row['qty_in'], row['qty_out'], row['qty_total'], row['origin']])
                } else {
                    worksheet_data.push(['CANTIDAD AL ' + row['date'] + ': ' + row['init_balance']])
                }
            })
            var WorkSheet = XLSX.utils.aoa_to_sheet(worksheet_data)

            workbook.Sheets[sheet_name] = WorkSheet
        }
        var wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' })

        conversion del objecto a buffer y de buffer a Blob
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length)
            var view = new Uint8Array(buf)
            for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
            return buf
        }
        saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'kardex.xlsx')
    } else {
        alert('No hay datos calculados')
    }