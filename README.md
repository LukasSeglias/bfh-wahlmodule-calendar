# Wahlmodule Kalender Berner Fachhochschule
Diese simple Applikation liest die Wahlmodule unter https://content.bfh.ch/de/ti/studieninformationen/informatik/module/wahlmodule.html aus und stellt diese in einer Kalenderansicht dar und soll bei der Planung und Auswahl der Wahlmodule helfen.

![Preview](https://github.com/LukasSeglias/bfh-wahlmodule-calendar/raw/master/preview.PNG "Vorschau")

# Usage
```
docker-compose up -d
```

Anschliessend läuft die App unter http://localhost:9020/

Es kann durchaus etwas dauern, bis die Module von der Website ausgelesen und im Kalender angezeigt werden. 

Die Module die gemäss BFH-Website nicht stattfinden, sind rot hinterlegt. Per Click auf ein Modul kann dessen Modulbeschreibung geöffnet werden. 

In der Datei **public/blacklist.txt** kann ein Modultitel pro Zeile eingetragen werden, um dieses in der Kalenderansicht auszublenden.

Filter auf das Semester: http://localhost:9020/?semester=FS und http://localhost:9020/?semester=HS

Auszug der Fitler auf Standort: http://localhost:9020/?standort=Be und http://localhost:9020/?standort=Bi

